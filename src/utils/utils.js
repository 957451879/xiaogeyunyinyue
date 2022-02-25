export default {
    getFullDate(time) {
        let date = new Date(time)
        // console.log(date)
        // console.log(date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日')
        return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
    }
}