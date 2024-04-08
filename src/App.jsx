import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app-wrapper container">
      <h1 className="text-center py-4">To Do List</h1>
      <TodoList />
    </div>
  )
}

export default App;