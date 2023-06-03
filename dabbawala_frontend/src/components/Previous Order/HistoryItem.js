import classes from './HistoryItem.module.css';
import OrderedItems from './OrderedItems';

const HistoryItem = (props) => {
    let payment;
    if (props.payment == "COD")
        payment = "Cash on Delivery";
    else
        payment = "Google Pay";
    console.log(props);
    const orderedItems = props.ordereditems;

    const OrderedList = (
        <ul>
            {orderedItems.map((item) => (
                <OrderedItems
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                />
            ))}
        </ul>
    );

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.date}</h2>
                {OrderedList}
                <h3>Method of payment : {payment}</h3>
            </div>
        </li>
    );
}
export default HistoryItem;