// src/app/page.tsx (หรือไฟล์อื่นๆ ที่ต้องการใช้ Prisma)
import TodoList from '@/components/Todolist';
import { getTodo } from '@/utils/action';

export default async function Home() {
  const [todo] = await Promise.all([getTodo()])
  return (
    <>
        <TodoList todos={todo} />
    </>
);
}
