
// unused


// props = {title: "", items: []}
// <Popover title="" items={} />


const Popover = (props) => {
  return (

      <div>
        <div>{props.title}</div>
        <ul>
          {props.items.map(item => <li><button><div>{item}</div></button></li>)}
        </ul>
      </div>

  );
}

export default Popover;