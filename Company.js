"use strict";
// type == 1 web type = 2 mob
class Task {
  constructor() {
    this.type = Math.floor(Math.random(2) * 2) + 1;
    this.hard = Math.floor(Math.random(3) * 3) + 1;
    this.complete = 0;

    this.Complete = function(complete) {
      if (!arguments.length) return this.complete;
      this.complete = complete;
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
    this.tasks = 0;

    this.Practice = function(count) {
      if (!arguments.length) return this.practice;
      this.practice += count;
    };
    this.Task = function(task) {
      if (!arguments.length) return this.tasks;
      this.tasks += task;
    };
  }
}

// type == 1 web type == 2 mob type ==3 QA
class Department {
  constructor() {
    this.agents;
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

class Firm {
  constructor() {
    this.Tasks = [];
    this.tasks = 0;
  }

  gainTasks() {
    this.tasks = Math.floor(Math.random(4) * 5);
    console.log(this.tasks);
    var taskLen = this.Tasks.length;
    for (let index = taskLen; index < taskLen + this.tasks; index++) {
      let task = new Task();
      console.log(task);
      this.Tasks[index] = task;
      console.log(this.Tasks);
    }
  }

  gainAgents() {
    for (let index = 0; index < this.tasks; index++) {
      let agent = new Agent();
      if (this.Tasks[index].Complete() == 1) {
        departmentQA.Agents(agent);
        agent.Practice(0);
        agent.Task(this.Tasks[index]);
        this.Tasks.splice(index, 1);
        console.log(agent);
      } else {
        switch (this.Tasks[index].Type) {
          case 1:
            departmentWeb.Agents(agent);
            agent.Practice(0);
            console.log(this.Tasks[index]);
            agent.Task(1);
            this.Tasks.splice(index, 1);
            console.log(agent);
            break;
          case 2:
            departmentWeb.Agents(agent);
            agent.Practice(0);
            agent.Task(1);
            this.Tasks.splice(index, 1);
            console.log(agent);
            break;
        }
      }
    }
  }
  delAgent() {
    for (let index = 0; index < departmentMob.getAgents(); index++) {
      if (departmentMob.Agents[index].practice == 4) {
        departmentMob.Agents.splice(index, 1);
      }
    }
    for (let index = 0; index < departmentWeb.getAgents(); index++) {
      if (departmentWeb.Agents[index].practice == 4) {
        departmentWeb.Agents.splice(index, 1);
      }
    }
    for (let index = 0; index < departmentQA.getAgents(); index++) {
      if (departmentQA.Agents[index].practice == 4) {
        departmentQA.Agents.splice(index, 1);
      }
    }
  }

  Work() {
    for (let index = 0; index < Tasks.length; index++) {
      if (Tasks[index].complete != 1) {
        Agents.forEach(function(item) {
          if (
            Agents[item].Practice() > 0 &&
            Agents[item].Special() == Tasks[index].Type()
          ) {
            Agents[item].Task(1);
            Agents[item].Practice(0);
          }
        });
      }
      if (Tasks[index].complete) {
        Agents.forEach(function(item) {
          if (Agents[item].Practice() > 0 && Agents[item].Special() == 3) {
            Agents[item].Task(1);
            Agents[item].Practice(0);
          }
        });
      }
    }
  }
}

let departmentWeb = new Department();
departmentWeb.setSpecial = 1;

let departmentMob = new Department();
departmentMob.setSpecial = 2;

let departmentQA = new Department();
departmentQA.setSpecial = 3;

let firm = new Firm();

firm.gainTasks(); // получение тасков 1 день
firm.gainAgents();

function day() {
  firm.gainTasks(); //получение тасков
  firm.gainAgents(); //найм работнков
  //передача проектов
  firm.delAgent(); // увольнение
}
