// Zustand 是一个轻量级的状态管理库，用于在 React 应用中管理状态。
import { create } from 'zustand'

// ActiveListStore 是一个接口，定义了 Zustand store 的状态和操作。
interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

// create 是 Zustand 的一个函数，用于创建 Zustand store。
// add 操作用于添加一个活动的用户，它的参数是用户的 ID，它使用 set 函数更新 members 状态，将用户的 ID 添加到 members 状态的末尾。

// remove 操作用于删除一个活动的用户，它的参数是用户的 ID，它使用 set 函数更新 members 状态，将 members 状态中等于用户 ID 的元素删除。

// set 操作用于设置活动的用户列表，它的参数是用户 ID 的数组，它使用 set 函数更新 members 状态，将 members 状态设置为用户 ID 的数组。


const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
  set: (ids) => set({ members: ids })
}));

export default useActiveList;
