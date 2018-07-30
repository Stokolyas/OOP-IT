// type == 1 web type = 2 mob
class Task {
    constructor() {
        this.type = Math.floor(Math.random(2) * (2)) + 1;
        this.hard = Math.floor(Math.random(3) * (3)) + 1;
        this.complete = 0
    }

    get Type() {
        return this.type
    }

    get Hard() {
        return this.hard
    }

    get Complete() {
        return this.complete
    }

    set Complete(complete) {
        this.complete = complete
    }
}

class Agent {
    constructor() {
        this.practice
        this.tasks
    }

    set Task(index) {
        this.tasks += index
    }

    set Practice(n) {
        this.practice = n
    }

    get Task() {
        return (this.tasks)
    }

    get Practice() {
        return (this.practice)
    }
}

// type == 1 web type == 2 mob type ==3 QA
class Department {
    constructor() {
        this.agents
        this.special
    }

    set Agents(agent) {
        this.agents += agent
    }

    set Special(n) {
        this.special = n
    }

    get Special() {
        return (this.special)
    }

    get Agents() {
        return this.agents
    }
}

class Firm {
    constructor() {
        this.Tasks = []
        this.tasks
    }
    
    gainTasks() {
        this.tasks = Math.floor(Math.random(4) * (5));
        console.log(this.tasks)
        var taskLen = this.Tasks.length
        for (let index = taskLen; index < taskLen + this.tasks; index++) {
            let task = new Task
            console.log(task)
            this.Tasks[index] = task
            
            console.log(this.Tasks)
        }
        
    }

    gainAgents() {
        for (let index = 0; index < this.tasks; index++) {
            let agent = new Agent
            console.log(this.Tasks[index].Complete)
            if (this.Tasks[index].Complete == 1) {
                departmentQA.Agents(agent)
                agent.Practice(0)
                agent.Task(1)
                this.Tasks.splice(index, 1)
                console.log(agent)
            } else {
                switch (this.Tasks[index].Type) {
                    case 1:
                        departmentWeb.Agents(agent)
                        agent.Practice(0)
                        agent.Task(Tasks[index])
                        this.Tasks.splice(index, 1)
                        console.log(agent)
                        break;
                    case 2:
                        departmentMob.Agents(agent)
                        agent.Practice(0)
                        agent.Task(Tasks[index])
                        this.Tasks.splice(index, 1)
                        console.log(agent)
                        break;
                }
            }
        }
    }

    
}


let departmentWeb = new Department
departmentWeb.setSpecial = 1

let departmentMob = new Department
departmentMob.setSpecial = 2

let departmentQA = new Department
departmentQA.setSpecial = 3

let firm = new Firm

firm.gainTasks(); // получение тасков 1 день

for (let index = 1; index < 10; index++) {
    console.log(index)
    firm.gainAgents();
    
}