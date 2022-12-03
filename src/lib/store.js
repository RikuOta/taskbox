/* シンプルな redux store/action/reducer の実装です。
 * 本当のアプリはもっと複雑で、異なるファイルに分離されます。
 */
import { configureStore, createSlice } from '@reduxjs/toolkit'

/*
 * アプリがロードされたときのストアの初期状態です。
 * 通常はサーバーから取得します。今は気にしないようにしましょう。
 */
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' }
]
const TaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null
}

/*
 * ストアはここで作成されます。
 * Redux Toolkit のスライスについてはドキュメントで詳しく説明されています。
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload
      const task = state.tasks.findIndex((task) => task.id === id)
      if (task >= 0) {
        state.tasks[task].state = newTaskState
      }
    }
  }
})

// スライスに含まれるアクションは、コンポーネントで使用するためにエクスポートされます。
export const { updateTaskState } = TasksSlice.actions

/*
 * 私たちのアプリのストア設定はここになります。
 * Redux の configureStore について詳しくはドキュメントをご覧ください。
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer
  }
})

export default store
