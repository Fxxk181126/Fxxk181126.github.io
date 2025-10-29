---
layout: post
title: "Vue 3 Composition API 完全指南"
date: 2024-01-15
categories: [前端开发, Vue.js]
tags: [Vue3, Composition API, JavaScript, 前端]
image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Vue.js%20logo%20composition%20api%20modern%20web%20development&image_size=landscape_16_9"
excerpt: "深入了解 Vue 3 Composition API 的核心概念、使用方法和最佳实践，帮助你更好地构建现代化的 Vue 应用。"
---

Vue 3 引入的 Composition API 是一个重大的变革，它为我们提供了更灵活、更强大的组件逻辑组织方式。本文将深入探讨 Composition API 的核心概念和实际应用。

## 什么是 Composition API？

Composition API 是 Vue 3 中新增的一套 API，它允许我们使用函数的方式来组织组件的逻辑。相比于 Options API，Composition API 提供了更好的逻辑复用性和类型推导支持。

### 核心优势

1. **更好的逻辑复用** - 通过组合函数实现逻辑复用
2. **更好的类型推导** - 对 TypeScript 的支持更加友好
3. **更灵活的代码组织** - 相关逻辑可以组织在一起
4. **更小的打包体积** - 更好的 tree-shaking 支持

## 基础用法

### setup 函数

`setup` 函数是 Composition API 的入口点：

```javascript
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3',
      version: '3.0'
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回模板需要的数据和方法
    return {
      count,
      state,
      doubleCount,
      increment
    }
  }
}
```

### 响应式 API

#### ref 和 reactive

```javascript
import { ref, reactive } from 'vue'

// ref - 用于基本类型
const count = ref(0)
const message = ref('Hello')

// reactive - 用于对象类型
const state = reactive({
  user: {
    name: 'John',
    age: 30
  },
  posts: []
})

// 访问 ref 的值需要使用 .value
console.log(count.value) // 0
count.value = 1

// reactive 对象可以直接访问
console.log(state.user.name) // 'John'
state.user.name = 'Jane'
```

#### computed 计算属性

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
```

#### watch 和 watchEffect

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Vue' })

// watch - 监听特定数据源
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})

// 监听多个数据源
watch([count, () => state.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Multiple values changed')
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`Count is ${count.value}`)
  console.log(`Name is ${state.name}`)
})
```

## 组合函数 (Composables)

组合函数是 Composition API 的核心特性之一，它允许我们将相关的逻辑封装成可复用的函数。

### 创建组合函数

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

### 使用组合函数

```javascript
// 在组件中使用
import { useCounter } from '@/composables/useCounter'

export default {
  setup() {
    const { count, doubleCount, increment, decrement, reset } = useCounter(10)
    
    return {
      count,
      doubleCount,
      increment,
      decrement,
      reset
    }
  }
}
```

## 生命周期钩子

Composition API 提供了对应的生命周期钩子函数：

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件即将挂载')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onBeforeUpdate(() => {
      console.log('组件即将更新')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onBeforeUnmount(() => {
      console.log('组件即将卸载')
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 实际应用示例

让我们创建一个完整的待办事项组件来演示 Composition API 的实际应用：

```javascript
// components/TodoList.vue
<template>
  <div class="todo-list">
    <h2>待办事项 ({{ stats.total }})</h2>
    
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        placeholder="添加新的待办事项"
        required
      />
      <button type="submit">添加</button>
    </form>
    
    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
        />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>
    
    <div class="stats">
      <p>已完成: {{ stats.completed }} / {{ stats.total }}</p>
      <p>进度: {{ stats.percentage }}%</p>
    </div>
  </div>
</template>

<script>
import { useTodos } from '@/composables/useTodos'

export default {
  name: 'TodoList',
  setup() {
    const {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      stats,
      addTodo,
      removeTodo
    } = useTodos()
    
    return {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      stats,
      addTodo,
      removeTodo
    }
  }
}
</script>
```

```javascript
// composables/useTodos.js
import { ref, reactive, computed } from 'vue'

export function useTodos() {
  const todos = ref([])
  const newTodo = ref('')
  const currentFilter = ref('全部')
  
  const filters = ['全部', '未完成', '已完成']
  
  // 计算属性
  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case '未完成':
        return todos.value.filter(todo => !todo.completed)
      case '已完成':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  const stats = computed(() => {
    const total = todos.value.length
    const completed = todos.value.filter(todo => todo.completed).length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    
    return {
      total,
      completed,
      percentage
    }
  })
  
  // 方法
  const addTodo = () => {
    if (newTodo.value.trim()) {
      todos.value.push({
        id: Date.now(),
        text: newTodo.value.trim(),
        completed: false
      })
      newTodo.value = ''
    }
  }
  
  const removeTodo = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }
  
  return {
    todos,
    newTodo,
    currentFilter,
    filters,
    filteredTodos,
    stats,
    addTodo,
    removeTodo
  }
}
```

## 最佳实践

### 1. 合理使用 ref 和 reactive

- 基本类型使用 `ref`
- 对象类型使用 `reactive`
- 需要替换整个对象时使用 `ref`

### 2. 组合函数命名规范

- 使用 `use` 前缀
- 使用驼峰命名法
- 名称要具有描述性

### 3. 逻辑分组

将相关的逻辑组织在一起：

```javascript
export default {
  setup() {
    // 用户相关逻辑
    const { user, login, logout } = useAuth()
    
    // 数据获取逻辑
    const { data, loading, error, fetchData } = useApi('/api/posts')
    
    // 表单逻辑
    const { form, validate, submit } = useForm()
    
    return {
      // 用户
      user,
      login,
      logout,
      
      // 数据
      data,
      loading,
      error,
      fetchData,
      
      // 表单
      form,
      validate,
      submit
    }
  }
}
```

### 4. TypeScript 支持

```typescript
import { ref, Ref, computed, ComputedRef } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export function useUser(): {
  user: Ref<User | null>
  isLoggedIn: ComputedRef<boolean>
  login: (userData: User) => void
  logout: () => void
} {
  const user = ref<User | null>(null)
  
  const isLoggedIn = computed(() => user.value !== null)
  
  const login = (userData: User) => {
    user.value = userData
  }
  
  const logout = () => {
    user.value = null
  }
  
  return {
    user,
    isLoggedIn,
    login,
    logout
  }
}
```

## 总结

Composition API 为 Vue 3 带来了更强大、更灵活的组件开发方式。通过合理使用响应式 API、组合函数和生命周期钩子，我们可以构建更加模块化、可维护的应用程序。

关键要点：

1. **setup 函数**是 Composition API 的入口
2. **ref 和 reactive**提供响应式数据
3. **组合函数**实现逻辑复用
4. **合理的代码组织**提高可维护性
5. **TypeScript 支持**提供更好的开发体验

掌握 Composition API 将帮助你构建更加现代化、高效的 Vue 应用程序。