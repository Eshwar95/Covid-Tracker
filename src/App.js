import React, {Component} from 'react';
import styles from './App.module.css';
import corona_title from './Images/corona_title.png';
import Particles from 'react-particles-js';

//This import is coming from index.js under components which exports the defualt files or compoenents for short hand
import {Cards, Charts, CountryPicker} from './components';
import {fetchDataFromApi} from './api';

const particlesOptions = {
	particles: {
	number:{
		value:55,
		density: {
			enable:true,
			value_area: 800
		}
	}	
	}
}

class App extends Component{

    state = {
        data: {}
    }

    async componentDidMount() {
        const fetchedData = await fetchDataFromApi();

        this.setState({data: fetchedData});
    }

    handleCountryChange = async(country) => {
        //We need fetch the changed country and set it as the updated state in this function
        const fetchedData = await fetchDataFromApi(country);
        this.setState({data: fetchedData , country: country});
        // console.log(fetchedData);
        // console.log(country);
    }

    render(){
        const {data, country}  =this.state;
        return (
            <div className = {styles.container}>
                <Particles className= {styles.particles}
	              params={particlesOptions}
	            />
                <img className={styles.image} src= {corona_title} alt="COVID-19 Tracker"/>
                <Cards data = {data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Charts data = {data} country={country} />
            </div>
        )
    }
}

export default App;