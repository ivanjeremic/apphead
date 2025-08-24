import { Effect, HashMap, Ref } from "effect"

// Temporary local models to unblock build; replace with @apphead/ecommerce or internal API
class TodoId {
  static make(n: number): TodoId {
    return new TodoId(n)
  }
  constructor(public id: number) {}
}
class Todo {
  constructor(public data: { id: TodoId; text: string; done: boolean }) {}
  get id() {
    return this.data.id
  }
  get text() {
    return this.data.text
  }
  get done() {
    return this.data.done
  }
}
class TodoNotFound {
  readonly _tag = "TodoNotFound"
  constructor(public args: { id: TodoId }) {}
}

export class TodosRepository extends Effect.Service<TodosRepository>()("api/TodosRepository", {
  effect: Effect.gen(function*() {
    const todos = yield* Ref.make(HashMap.empty<TodoId, Todo>())

    const getAll = Ref.get(todos).pipe(
      Effect.map((map) => Array.from(HashMap.values(map)))
    )

    function getById(id: TodoId): Effect.Effect<Todo, TodoNotFound> {
      return Ref.get(todos).pipe(
        Effect.flatMap((map) => HashMap.get(map, id)),
        Effect.catchAll(() => Effect.fail(new TodoNotFound({ id })))
      )
    }

    function create(text: string): Effect.Effect<Todo> {
      return Ref.modify(todos, (map) => {
        const max = Array.from(HashMap.values(map)).reduce((m: number, t: any) => t.id.id > m ? t.id.id : m, -1)
        const id = TodoId.make(max + 1)
        const todo = new Todo({ id, text, done: false })
        return [todo, HashMap.set(map, id, todo) as any]
      })
    }

    function complete(id: TodoId): Effect.Effect<Todo, TodoNotFound> {
      return getById(id).pipe(
        Effect.map((todo) => new Todo({ id: todo.id, text: todo.text, done: true })),
        Effect.tap((todo) => Ref.update(todos, (map) => HashMap.set(map, todo.id, todo) as any))
      )
    }

    function remove(id: TodoId): Effect.Effect<void, TodoNotFound> {
      return getById(id).pipe(
        Effect.flatMap((todo) => Ref.update(todos, (map) => HashMap.remove(map, todo.id)))
      )
    }

    return {
      getAll,
      getById,
      create,
      complete,
      remove
    } as const
  })
}) {}
