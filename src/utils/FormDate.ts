export default function FormatDate(data: string){
    const date = new Date(data);
    return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
}