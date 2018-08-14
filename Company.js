/* eslint-disable no-console,no-undef,max-statements,no-trailing-spaces,func-style,max-len */
"use strict";
// type == 1 web type = 2 mob
class Task {
  constructor() {
    this.type = Math.floor(Math.random(2) * 2) + 1;
    this.hard = Math.floor(Math.random(3) * 3) + 1;
    this.complete = 0;
    this.busy = false;

    this.Complete = function (complete) {
      if (!arguments.length) return this.complete;
      this.complete = complete;
    };
    this.Busy = function (busy) {
      if (!arguments.length) return this.busy;
      this.busy = busy;
    };
    this.Hard = function (hard) {
      if (!arguments.length) return this.hard;
      this.hard = hard;
    };
    this.Type = function (type) {
      if (!arguments.length) return this.type;
      this.type = type;
    };
  }
}

class Agent {
  constructor() {
    this.practice = 0;
    this.tasks = [];

    this.Practice = function (count) {
      if (!arguments.length) return this.practice;
      this.practice += count;
    };
    this.Task = function (task) {
      if (!arguments.length) return this.tasks;

      this.tasks.push(task);

    };
  }
}

// type == 1 web type == 2 mob type ==3 QA
class Department {
  constructor() {
    this.agents = []
    this.special = 0;

    this.Agents = function (agent) {
      if (!arguments.length) return this.agents;
      this.agents.push(agent);
    };
    this.Special = function (special) {
      if (!arguments.length) return this.special;
      this.special = special;
    };
  }
}

var Tasks = []

class Firm {

  constructor() {
    this.countTask = 0;
  }

  /*
   * получение случайное количество тасков
   * вычисление конца массива тасков
   * дозапись тасков в массив
   */

  gainTasks() {
    this.countTask = Math.floor(Math.random(4) * 5);
    console.log(this.countTask, "заданий")
    let taskLen = Tasks.length;
    for (var index = taskLen; index < taskLen + this.countTask; index++) {
      let task = new Task();
      Tasks[index] = task;
    }
  }

  /*
   * найм работников на таски
   */

  gainAgents() {
    for (let index = 0; index < this.countTask; index++) {
      let agent = new Agent();
      if (Tasks[index].Complete() > 0) {
        departmentQA.Agents(agent)
        agent.Practice(0)
        agent.Task(Tasks[index])
        Tasks[index].Busy(true)
      } else {
        switch (Tasks[index].Type()) {
          case 1:
            departmentWeb.Agents(agent)
            agent.Practice(0)
            Tasks[index].Busy(true)
            agent.Task(Tasks[index])
            break
          case 2:
            departmentMob.Agents(agent)
            agent.Practice(0)
            Tasks[index].Busy(true)
            agent.Task(Tasks[index])
            break
        }
      }

    }
  }

  delAgent() {
    // увольнение моб разрабов
    for (let index = 0; index < departmentMob.Agents(); index++) {
      if (departmentMob.Agents[index].practice === 4) {
        departmentMob.Agents.splice(index, 1);
      }
    }
    // увольнение веб разрабов
    for (let index = 0; index < departmentWeb.Agents(); index++) {
      if (departmentWeb.Agents[index].practice === 4) {
        departmentWeb.Agents.splice(index, 1);
      }
    }
    // увольнение тест разрабов
    for (let index = 0; index < departmentQA.Agents(); index++) {
      if (departmentQA.Agents[index].practice === 4) {
        departmentQA.Agents.splice(index, 1);
      }
    }
  }

  sendTask() {
    // передача тасков свободным разрабам веб и моб
    for (let index = 0; index < Tasks.length; index++) {
      if (!Tasks[index].Busy() && Tasks[index].Complete() < 1) {
        departmentMob.agents.forEach(function (item) {
          if (item.Practice() > 0 && Tasks[index].Type() === 2) {
            Tasks[index].Busy(true)
            item.Task(Tasks[index])
            item.Practice(0);
          }
        });
        departmentWeb.agents.forEach(function (item) {
          if (
            item.Practice() > 0 &&
            Tasks[index].Type() === 1
          ) {
            Tasks[index].Busy(true)
            item.Task(Tasks[index])
            item.Practice(0);
          }
        });
      }
      // передача тасков свободным тестерам
      if (!Tasks[index].Busy() && Tasks[index].complete == 1) {
        departmentQA.agents.forEach(function (item) {
          if (item.Practice() > 0 && item.Special() == 3) {
            Tasks[index].Busy(true)
            item.Task(Tasks[index])
            item.Practice(0);
          }
        });
      }
    }
  }

  workDay() {
    departmentWeb.Agents().forEach(function (item) {
      var array = item.Task()
      for (let indexHard = 0; indexHard < array.length; indexHard++) {
        if (item.Task()[indexHard].hard === 1) {
          item.Practice(1);
          item.Task()[indexHard].Complete(1)
        }
        if (item.Task()[indexHard].hard === 2) {
          item.Task()[indexHard].Hard(1)
        }
        if (item.Task()[indexHard].hard === 3) {
          item.Task()[indexHard].Hard(2)
        }
      }
    });
    departmentMob.Agents().forEach(function (item) {
      var array = item.Task()
      for (let indexHard = 0; indexHard < array.length; indexHard++) {
        if (item.Task()[indexHard].hard === 1) {
          item.Practice(1);
          item.Task()[indexHard].Complete(1)
        }
        if (item.Task()[indexHard].hard === 2) {
          item.Task()[indexHard].Hard(1)
        }
        if (item.Task()[indexHard].hard === 3) {
          item.Task()[indexHard].Hard(2)
        }
      }
    });
    departmentQA.Agents().forEach(function (item) {
      var array = item.Task()
      for (let indexHard = 0; indexHard < array.length; indexHard++) {
          item.Practice(1);
          item.Task()[indexHard].Complete(2)
          console.log(item.Task()[indexHard])
      }
    });
  }
}

let departmentWeb = new Department();
departmentWeb.Special(1);

let departmentMob = new Department();
departmentMob.Special(2);

let departmentQA = new Department();
departmentQA.Special(3);

let firm = new Firm();

// eslint-disable-next-line require-jsdoc
function day(count) {
  for (let index = 0; index < count; index++) {
    console.log(index, "day")
    firm.gainAgents(); // найм разрабов
    firm.gainTasks(); // получение тасков 1 день
    firm.sendTask(); // распределение тасков между всеми
    firm.workDay();

  }
  console.log(Tasks)
  console.log(departmentWeb)
  console.log(departmentMob)
  console.log(departmentQA)
}

day(5);
