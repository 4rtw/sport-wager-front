export class CustomDate {
  formatDate(date: Date): string {
    //console.log(date);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  getDateTime(d, type): string {
    const date = new Date(d);
    if (type === 'date') {
      return date.toLocaleDateString();
    }
    if (type === 'time') {
      return date.toLocaleTimeString().substr(0, 5);
    }
  }
}
