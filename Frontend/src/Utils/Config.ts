class Config {
  public registerUrl = "";
  public loginUrl = "";
  public allEmployeesUrl = "";
  public timeInGermanyUrl = "";
  public attendanceUrl = "";
  public employeeAttendance = "";
  public addAttendanceUrl = "";
  public oneAttendance = "";

}

class DevelopmentConfig extends Config {
  public registerUrl = "http://localhost:3001/api/auth0/register/";
  public loginUrl = "http://localhost:3001/api/auth0/login/";
  public allEmployeesUrl = "http://localhost:3001/api/all-employees";
  public timeInGermanyUrl = "http://localhost:3001/api/time-in-germany";
  public attendanceUrl = "http://localhost:3001/api/attendance/";
  public employeeAttendance = "http://localhost:3001/api/employees-attendance/"
  public addAttendanceUrl = "http://localhost:3001/api/attendance";
  public oneAttendance ="http://localhost:3001/api/specific-attendance/";
}

class ProductionConfig extends Config {
  public registerUrl = "http://localhost:3001/api/auth0/register/";
  public loginUrl = "http://localhost:3001/api/auth0/login/";
  public allEmployeesUrl = "http://localhost:3001/api/all-employees";
  public timeInGermanyUrl = "http://localhost:3001/api/time-in-germany";
  public attendanceUrl = "http://localhost:3001/api/attendance/";
  public employeeAttendance = "http://localhost:3001/api/employees-attendance/"
  public addAttendanceUrl = "http://localhost:3001/api/attendance";
  public oneAttendance ="http://localhost:3001/api/specific-attendance/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
