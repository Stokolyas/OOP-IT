var Agents = []
var Tasks = []


class Firm {
    constructor() {}

    gainTasks() {
        tasks = Math.floor(Math.random(4) * (5));
        for (let index = Tasks.length; index < Tasks.length + tasks; index++) {
            let task = new Task
            Tasks[index] = task
        }
    }

    gainAgents() {
        for (let index = 0; index < tasks; index++) {
            let agent = new Agent
            if (Tasks[index].getComplete() == 1) {
                departmentQA.setAgents(agent)
                agent.setPractice(0)
                agent.setTask()
                Tasks.splice(index, 1)
            } else {
                switch (Tasks[index].getType()) {
                    case 1:
                        departmentWeb.setAgents(agent)
                        agent.setPractice(0)
                        agent.setTask(Tasks[index])
                        Tasks.splice(index, 1)
                        break;
                    case 2:
                        departmentMob.setAgents(agent)
                        agent.setPractice(0)
                        agent.setTask(Tasks[index])
                        Tasks.splice(index, 1)
                        break;
                }
            }
        }
    }

    Work() {
        for (let index = 0; index < Tasks.length; index++) {
            if (Tasks[index].complete != 1) {
                Agents.forEach(function (item) {
                    if (Agents[item].getPractice() > 0 &&
                        Agents[item].getSpecial() == Tasks[index].getType()) {
                        Agents[item].setTask()
                        Agents[item].setPractice(0)
                    }
                });
            }
            if (Tasks[index].complete) {
                Agents.forEach(function (item) {
                    if (Agents[item].getPractice() > 0 &&
                        Agents[item].getSpecial() == 3) {
                        Agents[item].setTask()
                        Agents[item].setPractice(0)
                    }
                });
            }
        }
    }
}
// type == 1 web type = 2 mob
class Task {
    constructor() {
        this.type = Math.floor(Math.random(2) * (2)) + 1;
        this.hard = Math.floor(Math.random(3) * (3)) + 1;
        this.complete = 0
    }

    getType() {
        return this.type
    }

    getHard() {
        return this.hard
    }

    getComplete() {
        return this.complete
    }

    setComplete(complete) {
        this.complete = complete
    }
}

class Agent {
    constructor() {
        this.practice
        this.tasks
    }

    setTask() {
        this.tasks += 1
    }

    setPractice(n) {
        this.practice = n
    }

    getTask() {
        return (this.tasks)
    }

    getPractice() {
        return (this.practice)
    }
}

// type == 1 web type == 2 mob type ==3 QA
class Department {
    constructor() {
        this.agents
        this.special
    }

    setAgents(agent) {
        this.agents += agent
    }

    setSpecial(n) {
        this.special = n
    }

    getSpecial() {
        return (this.special)
    }

    getAgents() {
        return this.agents
    }
}

let departmentWeb = new Department 
departmentWeb.setSpecial = 1

let departmentMob = new Department
departmentMob.setSpecial = 2

let departmentQA = new Department
departmentQA.setSpecial = 3

for (let index = 0; index < 10; index++) {
    Firm.gainTasks // получение тасков
    Firm.gainAgents // распределение тасков
    // конец рабочего дня // перенаправление на тесты // закрытие тасков
    for (let index = 0; index < Tasks.length; index++) {
        if (Tasks[index].getComplete == 2) {
            Tasks.splice(index, 1)
        }
        if (Tasks[index].getComplete == 1) {
            Tasks[index].setComplete(2)
            
        }
        if (Tasks[index].getComplete == 0) {
            if (Tasks[index].getHard == 1) {
                Tasks[index].setComplete(1)
            }
        }
    }
}


