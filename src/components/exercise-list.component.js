import { React, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component {
    constructor(props) {
        super();

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            exercises: []
        }

    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises").then(res => {
            this.setState({
                exercises: res?.data
            })
        }).catch(error => {
            console.log(error);
        });
    }

    deleteExercise(id) {
        axios.delete(`http://localhost:5000/exercises/${id}`).then(res => {
            console.log(res);
            this.setState({
                exercises: this.state.exercises.filter(e => e._id !== id)
            })
        });
    }

    exerciseList() {
        return this.state.exercises.map(exercise => {
            return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}