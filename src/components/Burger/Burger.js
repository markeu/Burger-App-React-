import React from 'react';
import BurgerIngredients from '../../components/Burger/BurgerIngredients/BurgerIngredients'
import classes from './Burger.module.css'

const burger = ( props ) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((x, i) =>{
                return <BurgerIngredients key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
        console.log(transformedIngredients)
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}

export default burger;