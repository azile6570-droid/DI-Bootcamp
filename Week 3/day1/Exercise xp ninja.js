// Exercise 1
const person1 = {
  fullName: "John Smith",
  mass: 80,
  height: 1.75,
  bmi: function() {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "Jane Doe",
  mass: 70,
  height: 1.65,
  bmi: function() {
    return this.mass / (this.height * this.height);
  }
};

function compareBMI(personA, personB) {
  const bmiA = personA.bmi();
  const bmiB = personB.bmi();

  if (bmiA > bmiB) {
    return `${personA.fullName} has the larger BMI.`;
  } else if (bmiB > bmiA) {
    return `${personB.fullName} has the larger BMI.`;
  } else {
    return "Both people have the same BMI.";
  }
}

console.log(compareBMI(person1, person2));

// Exercise 2
function findAverage(gradesList) {
  let sum = 0;

  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }

  return sum / gradesList.length;
}

function checkResult(gradesList) {
  const average = findAverage(gradesList);

  console.log(`Average: ${average}`);

  if (average > 65) {
    console.log("You passed");
  } else {
    console.log("You failed and must repeat the course.");
  }
}

checkResult([70, 80, 90, 60, 65]);


