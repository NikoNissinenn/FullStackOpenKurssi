 const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{`${text} ${value}`} {text==="Positive" ? "%" : ""}</td>
    </tr>
  )
 };

 export default StatisticLine;