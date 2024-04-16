import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component';
import ExerciseList from './components/exercise-list.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className='container-fluid'>

        <Navbar />
        <br />
        <Routes>

          <Route path='/' exact Component={ExerciseList} />
          <Route path='/edit/:id' Component={(props) => <CreateExercise {...props} />} />
          <Route path='/create' Component={CreateExercise} />
          <Route path='/user' Component={CreateUser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
