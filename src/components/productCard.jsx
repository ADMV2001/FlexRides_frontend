export default function ProductCard(props){

    return(
        <div>
            <img src={props.image} alt="product" />
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <span>{props.price}</span>
        </div>
    )
}