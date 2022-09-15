import React from "react"

import { SEO } from "components/layouts"
import { TodoCards, TodoListCreate } from "components/organisms"

export default function Home() {
  return (
    <>
      <SEO />
      <main>
        <TodoListCreate />
        <TodoCards />
      </main>
    </>
  )
}
