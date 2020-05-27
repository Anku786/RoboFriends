import React ,{ Component }from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component{
	constructor(){
		super()
		this.state={
			Robots:[],
			searchField:''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
			return response.json();
		}).then(users=>{
			this.setState({Robots:users})
		});
	}

	onSearchChange=(event)=>{
		this.setState({
			searchField:event.target.value
		})
	}
	render(){
		const {Robots,searchField}=this.state;
		const filterRobots=Robots.filter(Robots=>{
			return Robots.name.toLowerCase().includes(searchField.toLowerCase());
		});
		if(Robots.length===0){
			return <h1>Loading</h1>
		}
		else{
			return(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundary>
							<CardList Robots={filterRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
		
	}
}
export default App;