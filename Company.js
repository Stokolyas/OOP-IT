/* eslint-disable no-console,no-undef,max-statements,no-trailing-spaces */
"use strict";
// type == 1 web type = 2 mob
class Task {
  constructor() {
    this.type = Math.floor(Math.random(2) * 2) + 1;
    this.hard = Math.floor(Math.random(3) * 3) + 1;
    this.complete;
    this.busy = false;

    this.Complete = function(complete) {
      if (!arguments.length) return this.complete;
      this.complete = complete;
    };
    this.Busy = function(busy) {
      if (!arguments.length) return this.busy;
      this.busy = busy;
    };
  }
  get Type() {
    return this.type;
  }

  get Hard() {
    return this.hard;
  }
}

class Agent {
  constructor() {
    this.practice = 0;
    this.tasks = [];

    this.Practice = function(count) {
      if (!arguments.length) return this.practice;
      this.practice += count;
    };
    this.Task = function(task) {
      if (!arguments.length) return this.tasks;
      
      this.tasks.push(task);

    };
  }
}

// type == 1 web type == 2 mob type ==3 QA
class Department {
  constructor() {
    this.agents
    this.special;

    this.Agents = function(agent) {
      if (!arguments.length) return this.agents;
      this.agents += agent;
    };
  }

  set Special(n) {
    this.special = n;
  }

  get Special() {
    return this.special;
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
      let taskLen = Tasks.length;
      for (var index = taskLen; index < taskLen + this.countTask; index++) {
      let task = new Task();
      Tasks[index] = task;
      console.log(Tasks);
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
          console.log(agent)
        } else {
          switch (Tasks[index].Type) {
            case 1:
              departmentWeb.Agents(agent)
              agent.Practice(0)
              Tasks[index].Busy(true)
              agent.Task(Tasks[index])
              console.log(agent)
              break
            case 2:
              departmentWeb.Agents(agent)
              agent.Practice(0)
              Tasks[index].Busy(true)
              agent.Task(Tasks[index])
              console.log(agent)
              break
          }
        }
      
    }
  }
  delAgent() {
    // увольнение моб разрабов
    for (let index = 0; index < departmentMob.getAgents(); index++) { 
      if (departmentMob.Agents[index].practice === 4) {
        departmentMob.Agents.splice(index, 1);
      }
    }
    // увольнение веб разрабов
    for (let index = 0; index < departmentWeb.getAgents(); index++) { 
      if (departmentWeb.Agents[index].practice === 4) {
        departmentWeb.Agents.splice(index, 1);
      }
    }
    // увольнение тест разрабов
    for (let index = 0; index < departmentQA.getAgents(); index++) { 
      if (departmentQA.Agents[index].practice === 4) {
        departmentQA.Agents.splice(index, 1);
      }
    }
  }

  sendTask() {
    // передача тасков свободным разрабам веб и моб
    for (let index = 0; index < Tasks.length; index++) {
      if (!Tasks[index].Busy() && Task[index].Complete() < 1) {
        Agents.forEach(function(item) {
          if (
            Agents[item].Practice() > 0 &&
            Agents[item].Special() == Tasks[index].Type()
          ) {
            Tasks[index].Busy(true)
            Agents[item].Task(Tasks[index])
            Agents[item].Practice(0);
          }
        });
      }
      // передача тасков свободным тестерам
      if (!Tasks[index].Busy() && Tasks[index].complete == 1) {
        Agents.forEach(function(item) {
          if (Agents[item].Practice() > 0 && Agents[item].Special() == 3) {
            Tasks[index].Busy(true)
            Agents[item].Task(Tasks[index])
            Agents[item].Practice(0);
            delTask(index)
          }
        });
      }
    }
  }

  delTask(task) {
    Task.splice(task, 1)
  }
}

let departmentWeb = new Department();
departmentWeb.setSpecial = 1;

let departmentMob = new Department();
departmentMob.setSpecial = 2;

let departmentQA = new Department();
departmentQA.setSpecial = 3;

let firm = new Firm();

firm.gainAgents(); // найм разрабов
firm.gainTasks(); // получение тасков 1 день
firm.sendTask(); // распределение тасков между всеми
firm.delAgent(); // увольнение разрабов
