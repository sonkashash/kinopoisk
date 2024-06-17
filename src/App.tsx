import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import MoviePage from './pages/MoviePage';



function App() {
  return (
    <Router>
      <Link to="">Главная</Link>
      <Link to="/movie">Фильм</Link>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie" element={<MoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;


// Огромное спасибо за ролик! Разбирать его как обычно в 2-3 раза дольше, чем сама длина ролика)
// Кто смотрит сейчас, вышел react-router-dom 6-той версии, синтаксис роутинга чуть изменился: 
// 1) exact писать не надо, все роуты сразу такие
// 2) Вместо <NavLink> используем <Link>
// 3) На смену <Switch> (его в ролике не использовали) пришёл <Routes>. Все <Route> нужно обернуть в компонент  <Routes>
// 4) Компонент в <Route> теперь передаём в пропсе element как компонент
// Пример кода: 
// <Routes>
//             <Route path="/users" element={<UserPage/>}/>
//             <Route path="/todos" element={<TodosPage/>}/>
//             <Route path="/user/:id" element={<UserItemPage/>}/>
//             <Route path="/todo/:id" element={<TodoItemPage/>}/>
//             <Route path="*" element={<div>NotFound</div>}/>
// </Routes>
// 5) Вместо useHistory используем useNavigate; 
// Пример кода: 
// const navigate = useNavigate();
// navigate("/users");
