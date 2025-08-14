const API_URL = 'http://34.228.37.38:3000/todos'; // あなたのEC2のIPアドレスに置き換えてください
const todoList = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

// タスク一覧を取得して表示する関数
const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todoList.innerHTML = ''; // 一旦リストをクリア
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.is_completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button onclick="toggleComplete(${todo.id}, ${!todo.is_completed})">完了</button>
                <button onclick="deleteTodo(${todo.id})">削除</button>
            </div>
        `;
        todoList.appendChild(li);
    });
};

// 新しいタスクを追加する関数
const addTodo = async () => {
    const task = taskInput.value;
    if (!task) return;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    taskInput.value = ''; // 入力欄をクリア
    fetchTodos(); // タスク一覧を再取得して更新
};

// タスクの完了状態を切り替える関数
const toggleComplete = async (id, is_completed) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed })
    });
    fetchTodos();
};

// タスクを削除する関数
const deleteTodo = async (id) => {
    // ユーザーに確認を求める
    if (!confirm('本当にこのタスクを削除しますか？')) {
        return; // 「キャンセル」が押されたら処理を中断
    }

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
};

// イベントリスナー
addBtn.addEventListener('click', addTodo);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});


const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<li>タスクがありません。</li>';
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.is_completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button onclick="toggleComplete(${todo.id}, ${!todo.is_completed})">完了</button>
                <button onclick="deleteTodo(${todo.id})">削除</button>
            </div>
        `;
        todoList.appendChild(li);
    });
};


// ... 既存のコード ...

// タスク一覧を取得して表示する関数
const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todoList.innerHTML = ''; // 一旦リストをクリア
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="todo-item"><span>タスクはありません。</span></li>';
    } else {
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.is_completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${todo.task}</span>
                <div>
                    <button onclick="toggleComplete(${todo.id}, ${!todo.is_completed})">完了</button>
                    <button onclick="deleteTodo(${todo.id})">削除</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }
};

// 初回ロード時にタスク一覧を取得
fetchTodos();