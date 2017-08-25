angular.module('taskApp', [])
    .controller('TaskListController', function ($scope, $http) {

        var TaskList = this;

        TaskList.tasks = [];

        /*
         * Chama o método GET para armazenar no TaskList os dados iniciais salvos no banco de dados.
         */
        $http({
            method: "GET",
            url: "../../tasklist"
        }).then(function mySuccess(response) {
            if (response.data) {
                response.data.forEach(function (result) {
                    TaskList.tasks.push({
                        id: result.id,
                        title: result.title,
                        done: result.status,
                        createDate: formatDate(new Date(result.createDate)),
                        lastUpdate: formatDate(new Date(result.lastUpdate)),
                        status: (result.status ? 'done' : 'pending'),
                        classStatus: (result.status ? 'label-success' : 'label-warning'),
                        description: result.description
                    })
                })
            }
        }, function myError(response) {
            alert(JSON.stringify(response));
        });

        /*
         * Função para adicionar uma task na list
         */
        TaskList.addTask = function () {

            //Se possui id, é uma edição
            if (TaskList.id) {
                angular.forEach(TaskList.tasks, function (task, index) {
                    
                    if (task.id == TaskList.id) {
                        $http({
                            method: "POST",
                            url: "../../tasklist",
                            data: {
                                id: task.id,
                                title: TaskList.taskTitle,
                                description: TaskList.description,
                                createDate: new Date(),
                                lastUpdate: new Date(),
                                status: TaskList.done
                            }
                        }).then(function mySuccess(response) {
                            TaskList.tasks[index].title = response.data.title;
                            TaskList.tasks[index].description = response.data.description;
                            TaskList.tasks[index].lastUpdate = formatDate(new Date());
                        }, function myError(response) {
                            alert(JSON.stringify(response));
                        });
                    }
                });
            } else {
                //Caso contrário, insere
                $http({
                    method: "POST",
                    url: "../../tasklist",
                    data: {
                        title: TaskList.taskTitle,
                        description: TaskList.description,
                        createDate: new Date(),
                        lastUpdate: new Date(),
                        status: false
                    }
                }).then(function mySuccess(response) {
                    TaskList.tasks.push({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        done: false,
                        createDate: formatDate(new Date()),
                        lastUpdate: formatDate(new Date()),
                        status: 'pending',
                        classStatus: 'label-warning'
                    });
                }, function myError(response) {
                    alert(JSON.stringify(response));
                });


            }

            TaskList.taskTitle = '';
            TaskList.description = '';
            TaskList.id = '';
        };

        /*
         * Retorna a quantidade de tasks faltantes
         */
        TaskList.remaining = function () {
            var count = 0;
            angular.forEach(TaskList.tasks, function (task) {
                count += task.done ? 0 : 1;
            });
            return count;
        };

        /*
         * Deleta uma task da list
         */
        TaskList.delete = function (obj) {

            $http({
                method: "DELETE",
                url: "../../tasklist/" + obj.id
            }).then(function mySuccess(response) {
                angular.forEach(TaskList.tasks, function (task, index) {
                    if (task.id == response.data.id) {
                        TaskList.tasks.splice(index, 1);
                    }
                });

            }, function myError(response) {
                alert(JSON.stringify(response));
            });
        }
        
        /*
         * Ao clicar no icone de edit, seta os campos para edição
         */
        TaskList.edit = function (obj) {
            TaskList.id = obj.id;
            TaskList.taskTitle = obj.title;
            TaskList.description = obj.description;
            TaskList.done = obj.done;
        }
        
        /*
         * Formata para o padrão brasileiro
         */
        function formatDate(_date) {
            return (_date.getDate() < 10 ? '0' : '') + _date.getDate() + '/' + (_date.getMonth() < 10 ? '0' : '') + (_date.getMonth() + 1) + '/' + _date.getFullYear()
        }
        
        /*
         * Converte para Date
         */
        function parseDate(_dateString) {
            return new Date(Number(_dateString.substr(6, 4)), Number(_dateString.substr(3, 2)) - 1, Number(_dateString.substr(0, 2)))
        }
        
        /*
         * Atualiza a Task para done
         */
        TaskList.doneTask = function (obj) {
            $http({
                method: "POST",
                url: "../../tasklist",
                data: {
                    id: obj.id,
                    title: obj.title,
                    description: obj.description,
                    createDate: parseDate(obj.createDate),
                    lastUpdate: parseDate(obj.lastUpdate),
                    status: obj.done
                }
            }).then(function mySuccess(response) {
                if (obj.done) {
                    obj.status = 'done';
                    obj.classStatus = 'label-success';
                } else {
                    obj.status = 'pending';
                    obj.classStatus = 'label-warning';
                }
            }, function myError(response) {
                alert(JSON.stringify(response));
            });


        }

    });