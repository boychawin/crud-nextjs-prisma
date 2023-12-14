"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

export async function create(formData: FormData) {
  const input = formData.get("input") as string;

  if (!input.trim()) {
    return;
  }

  await prisma.todo.create({
    data: {
      task: input,
    },
  });

  revalidatePath("/");
}

export async function edit(formData: FormData) {
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.todo.update({
    where: {
      id: Number(inputId),
    },
    data: {
      task: input,
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.todo.delete({
    where: {
      id: Number(inputId),
    },
  });

  revalidatePath("/");
}

export async function todoStatus(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(inputId),
    },
  });

  if (!todo) {
    return;
  }

  const updatedStatus = !todo.completed;

  await prisma.todo.update({
    where: {
      id: Number(inputId),
    },
    data: {
      completed: updatedStatus,
    },
  });

  revalidatePath("/");

  return updatedStatus;
}

export async function getTodo() {
  const todo = await prisma.todo.findMany({
    orderBy: {
      completed: 'asc'
    }
  });

  if (!todo) {
    return null;
  }
  revalidatePath("/");
  return todo;
}
