class Employee {
  constructor(name, experienceInYears, qualifications) {
    this.name = name;
    this.experienceInYears = experienceInYears;
    this.qualifications = qualifications;
  }

  toString() {
    return `Employee name: ${this.name} who has experience of ${
      this.experienceInYears
    } years practicing: ${this.qualifications.join(", ")}`;
  }
}

let employees = new Employee("Peter", 5, ["js", "c++", "it"]);
let employees2 = new Employee("John", 9, ["js", "cloud", "it"]);

console.log(employees.toString());
console.log(employees2.toString());
