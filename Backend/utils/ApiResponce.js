class ApiResponce {
  constructor(statuscode = 200, message = "", data) {
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponce;
