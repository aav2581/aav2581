(() => {

    const container = document.querySelector('.container');

    const students = [];

    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();

    // Приведение даты из n в 0n

    function moderateDate(type) {
        let month;
        (((type.getMonth() + 1) + '').length === 1) ? month = '0' + (type.getMonth() + 1): month = type.getMonth() + 1;
        let day;
        ((type.getDate() + '').length === 1) ? day = '0' + type.getDate(): day = type.getDate();
        return {
            month,
            day
        };
    }

    // Создание формы внсения нового студента

    function createAddedStudentForm() {

        const formAddedStudent = document.createElement('form');
        container.append(formAddedStudent);
        formAddedStudent.classList.add('add-sudent', 'mt-4', 'mb-4');

        const fielset = document.createElement('fieldset');
        formAddedStudent.append(fielset);
        const legend = document.createElement('legend');
        fielset.append(legend);
        legend.innerHTML = 'Добавьте данные нового студента';

        const firstRow = document.createElement('div');
        firstRow.classList.add('form-group', 'form-row');
        fielset.append(firstRow);

        const addStudentSurname = createInputForm(firstRow, 'addStudentSurname', 'Введите фамилию', 'Алексеев', 'text').input;
        const addStudentName = createInputForm(firstRow, 'addStudentName', 'Введите имя', 'Никодим', 'text').input;
        const addStudentMiddlename = createInputForm(firstRow, 'addStudentMiddlename', 'Введите отчество', 'Фёдорович', 'text').input;

        const secondRow = document.createElement('div');
        secondRow.classList.add('form-group', 'form-row');
        fielset.append(secondRow);

        const addStudentBirthDate = createInputForm(secondRow, 'addStudentBirthDate', 'Введите дату рождения', '12.03.1967', 'date').input;
        addStudentBirthDate.setAttribute('min', '1900-01-01');
        addStudentBirthDate.setAttribute('max', `${todayYear}-${moderateDate(todayDate).month}-${moderateDate(todayDate).day}`);
        const addStudentStudyDate = createInputForm(secondRow, 'addStudentStudyDate', 'Введите год начала обучения', '2…', 'number').input;
        addStudentStudyDate.setAttribute('min', '2000');
        addStudentStudyDate.setAttribute('max', todayYear);
        const addStudentFaculty = createInputForm(secondRow, 'addStudentFaculty', 'Введите название факультета', 'Физиологии', 'text').input;

        const addStudentButton = document.createElement('button');
        formAddedStudent.append(addStudentButton);
        addStudentButton.classList.add('btn', 'btn-dark');
        addStudentButton.innerHTML = 'Добавить студента';
        addStudentButton.setAttribute('type', 'submit');

        return {
            formAddedStudent,
            addStudentSurname,
            addStudentName,
            addStudentMiddlename,
            addStudentBirthDate,
            addStudentStudyDate,
            addStudentFaculty,
            addStudentButton,
        }

    }

    // Создание формы фильтрации студента

    function createFiltredForm() {
        const filtredStudentForm = document.createElement('form');
        container.append(filtredStudentForm);
        filtredStudentForm.classList.add('add-sudent', 'mt-4', 'mb-4');

        const fielset = document.createElement('fieldset');
        filtredStudentForm.append(fielset);
        const legend = document.createElement('legend');
        fielset.append(legend);
        legend.innerHTML = 'Поиск студента';

        const row = document.createElement('div');
        row.classList.add('form-group', 'form-row');
        fielset.append(row);

        const filtredStudentName = createInputForm(row, 'filtredStudentName', 'Поиск по ФИО', 'Камушев', 'text', 'fullName').input;
        const filtredStudentFaculty = createInputForm(row, 'filtredStudentFaculty', 'Поиск по факультету', 'Экологии', 'text', 'faculty').input;
        const filtredStudentStartStudy = createInputForm(row, 'filtredStudentStartStudy', 'Год начала учёбы', '2000', 'number', 'studyDate').input;
        const filtredStudentEndStudy = createInputForm(row, 'filtredStudentEndStudy', 'Год окончания учёбы', '2024', 'number', 'endStudyDate').input;

        const removeTableBtn = createBtn(filtredStudentForm, 'Удалить сортировку таблицы');
        const clearFiltredInputBtn = createBtn(filtredStudentForm, 'Отчистить форму поиска');

        return {
            filtredStudentForm,
            filtredStudentName,
            filtredStudentFaculty,
            filtredStudentStartStudy,
            filtredStudentEndStudy,
            removeTableBtn,
            clearFiltredInputBtn
        }
    }
    
    // Создание кнопки отчистки 

    function createBtn(add, inner) {
        let btn = document.createElement('button');
        add.after(btn);
        btn.classList.add('btn', 'btn-dark', 'mr-2', 'mb-4');
        btn.innerHTML = inner;
        return btn;
    }

    // Создание отдельного form-control

    function createInputForm(row, forId, label, placeholder, type = 'text', keyObj) {
        const collumn = document.createElement('div');
        row.append(collumn);
        collumn.classList.add('col');

        const labelInput = document.createElement('label');
        collumn.append(labelInput);
        labelInput.innerHTML = label;
        labelInput.setAttribute('for', forId);

        const input = document.createElement('input');
        collumn.append(input);
        input.classList.add('form-control');
        input.setAttribute('type', type);
        input.setAttribute('placeholder', placeholder);
        input.setAttribute('id', forId);
        if (keyObj !== undefined) {
            input.setAttribute('data-key', keyObj);
        }

        const error = document.createElement('span');
        collumn.append(error);
        error.classList.add('invalid-feedback');

        return {
            input,
            error
        }
    }

    // Создание таблицы без данных

    function createStartTable() {
        const table = document.createElement('table');
        container.append(table);
        table.classList.add('table', 'bg-secondary', 'text-light', 'table-hover');

        const capture = document.createElement('caption');
        table.append(capture);
        capture.innerHTML = 'Список студентов';

        const thead = document.createElement('thead');
        table.append(thead);
        thead.classList.add('bg-dark');

        const trHead = document.createElement('tr');
        thead.append(trHead);
        const headerTableName = createHeadTable(trHead, 'ФИО студента', 'fullName').td;
        const headerTableFaculty = createHeadTable(trHead, 'Факультет', 'faculty').td;
        const headerTableAge = createHeadTable(trHead, 'Дата рождения, возраст', 'fullAge').td;
        const headerTableDateStudy = createHeadTable(trHead, 'Годы обучения, номер курса', 'studyDate').td;

        const tbody = document.createElement('tbody');
        table.append(tbody);
        const trBody = document.createElement('tr');
        tbody.append(trBody);
        const tdBody = document.createElement('td');
        trBody.append(tdBody);
        tdBody.setAttribute('colspan', '4');
        tdBody.innerHTML = 'Список студентов пуст. Заполните форму, чтобы добавить студента';

        const deleteBtn = createBtn(table, 'Отчистить таблицу');

        return {
            table,
            headerTableName,
            headerTableFaculty,
            headerTableAge,
            headerTableDateStudy,
            tbody,
            trHead,
            deleteBtn,
        }
    }

    // Создание ячейки заголовка

    function createHeadTable(tr, inner, objKey) {
        const td = document.createElement('td');
        tr.append(td);
        td.classList.add('align-middle');
        td.style.cursor = 'pointer';
        td.setAttribute('tabindex', '0');
        td.innerHTML = inner;
        td.setAttribute('data-key', objKey)
        return {
            td
        }
    }

    // Добавление данных о студенте в массив

    function addStudentToArr(input) {
        let student = {};
        student.surname = addVallueToObj(input.addStudentSurname);
        student.name = addVallueToObj(input.addStudentName);
        student.middlename = addVallueToObj(input.addStudentMiddlename);
        student.birthDate = new Date(addVallueToObj(input.addStudentBirthDate));
        student.studyDate = addVallueToObj(input.addStudentStudyDate);
        student.faculty = addVallueToObj(input.addStudentFaculty);

        students.push(student);
    }

    // Создание объекта студент

    function addVallueToObj(input) {
        obj = input.value.trim().toLowerCase();
        input.value = '';
        return obj;
    }

    // Создание таблицы из массива

    function createTableRow(table, arr) {

        const tbody = table.tbody
        tbody.innerHTML = '';

        arr.forEach(student => {
            const tr = document.createElement('tr');
            tbody.append(tr);

            const name = createBodyTd(tr).bodyTd;
            name.innerHTML = `${changeStrForTable(student, 'surname')} ${changeStrForTable(student, 'name')} ${changeStrForTable(student, 'middlename')}`
            const faculty = createBodyTd(tr).bodyTd;
            faculty.innerHTML = changeStrForTable(student, 'faculty');
            const age = createBodyTd(tr).bodyTd;
            age.innerHTML = studentAgeForTable(student, 'birthDate');
            const dateStudy = createBodyTd(tr).bodyTd;
            dateStudy.innerHTML = studentStudyDateTable(student, 'studyDate');
        })
    }

    function createBodyTd(tr) {
        const bodyTd = document.createElement('td');
        tr.append(bodyTd);
        return {
            bodyTd
        }
    }

    function changeStrForTable(student, keyObj) {
        const str = Object.values(student)[Object.keys(student).indexOf(keyObj)];
        return str.replace(str.charAt(0), str.charAt(0).toUpperCase());
    }

    function studentAgeForTable(student, keyObj) {
        let date = Object.values(student)[Object.keys(student).indexOf(keyObj)];
        if (typeof (date) == 'string') date = new Date(date);
        const age = (todayYear - date.getFullYear()) + '';
        let word;
        if (age === '11' || age === '12' || age === '13' || age === '14') {
            word = 'лет';
        } else if (age.endsWith('2') || age.endsWith('3') || age.endsWith('4')) {
            word = 'года'
        } else if (age.endsWith('1')) {
            word = 'год';
        } else {
            word = 'лет';
        };
        return `${moderateDate(date).day}.${moderateDate(date).month}.${date.getFullYear()} (${age} ${word})`;
    }

    function studentStudyDateTable(student, keyObj) {
        const date = +(Object.values(student)[Object.keys(student).indexOf(keyObj)]);

        const studyYear = '' + date + ' - ' + (date + 4);
        let course;

        if (+('' + todayYear + (moderateDate(todayDate).month)) > +('' + (date + 4) + '09')) {
            course = 'закончил';
        } else {
            course = `${todayYear - (date - 1)} курс`;
        }
        return `${studyYear} (${course})`;
    }

    // Проверка наличия введённых символов в форму добавления студента

    function hasValue(arr) {
        return arr.every(input => input.value.trim().length >= 1);
    }

    // Создание числа для сравнения дат

    function transformDate(inputDate) {
        const fulltodayDay = +('' + todayYear + moderateDate(todayDate).month + moderateDate(todayDate).day);
        const birthDate = new Date(inputDate.addStudentBirthDate.value);
        const fullDateBirth = +('' + birthDate.getFullYear() + moderateDate(birthDate).month + moderateDate(birthDate).day);
        const yearStudy = +(inputDate.addStudentStudyDate.value);

        return {
            fullDateBirth,
            fulltodayDay,
            yearStudy,
            birthDate
        }
    }

    // Валидация даты

    function validateDate(inputDate) {
        const dateValue = transformDate(inputDate);

        if ((dateValue.fullDateBirth > 19000101 && dateValue.fullDateBirth < dateValue.fulltodayDay) && (dateValue.yearStudy >= 2000 && dateValue.yearStudy <= todayYear)) {
            return true;
        } else {
            return false;
        }
    }

    // Добавление результата валидации на поля с датами

    function dateNotice(input, inputDate) {
        const dateValue = transformDate(inputDate);

        if (input == inputDate.addStudentStudyDate) {
            if (dateValue.yearStudy < 2000) {
                addValidateNotice(input, 'add', 'Год поступления не может быть раньше 2000');
            } else if (dateValue.yearStudy > todayYear) {
                addValidateNotice(input, 'add', `Год поступления не может быть из будущего: из ${todayYear}`);
            } else if (dateValue.yearStudy < dateValue.birthDate.getFullYear()) {
                addValidateNotice(input, 'add', `Год поступления не может опережать возраст студента!`);
            } else {
                addValidateNotice(input);
            }
        }

        if (input == inputDate.addStudentBirthDate) {
            if (dateValue.fullDateBirth < 19000101) {
                addValidateNotice(input, 'add', 'Слишком большой возраст! Столько не живут!');
            } else if (dateValue.fullDateBirth > dateValue.fulltodayDay) {
                addValidateNotice(input, 'add', 'Слишком маленький возраст! Новорожденных не обучаем!');
            } else if (dateValue.yearStudy < dateValue.birthDate.getFullYear()) {
                addValidateNotice(input, 'add', 'Студент не может родиться раньше времени поступления');
            } else {
                addValidateNotice(input);
            }
        }
    }

    // Создание error-сообщения

    function addValidateNotice(key, done, inner = '') {
        key.nextElementSibling.innerHTML = inner;
        done === 'add' ? key.classList.add('is-invalid') : key.classList.remove('is-invalid');
    }

    // Полная проверка и валидация формы

    function validateForm(inputArr, formAddStudent) {
        inputArr.forEach(input => {
            if (input.value.length === 0) {
                addValidateNotice(input, 'add', 'Поле обязательно для заполнения');
            } else if ((input == formAddStudent.addStudentBirthDate || input == formAddStudent.addStudentStudyDate)) {
                dateNotice(input, formAddStudent);
            } else {
                addValidateNotice(input);
            }
        })
        return;
    }

    // Создание нового массива для сортировки данных

    function copyStudent() {
        const copyStudentsArr = students.slice();

        copyStudentsArr.forEach(student => {
            if (typeof (student.birthDate) === 'string') {
                student.birthDate = new Date(student.birthDate);
            }
            student.fullAge = +('' + student.birthDate.getFullYear() + moderateDate(student.birthDate).month + moderateDate(student.birthDate).day);
            student.fullName = student.surname + student.name + student.middlename;
            student.endStudyDate = +student.studyDate + 4;
        });
        return {
            copyStudentsArr
        };
    }

    // Сортировка данных по возрастанию

    function sortTable(key) {
        const keyArr = [];
        const newArrStudents = [];

        const copyStudentsArr = copyStudent().copyStudentsArr;

        copyStudentsArr.forEach(student => keyArr.push(Object.values(student)[Object.keys(student).indexOf(key)]));

        if (typeof (keyArr[0]) == 'number') {
            if (key === 'fullAge') {
                keyArr.sort((a, b) => {
                    return (b - a);
                });
            } else {
                keyArr.sort((a, b) => {
                    return (a - b);
                });
            }
        } else keyArr.sort();


        keyArr.forEach(keyStudent => {
            copyStudentsArr.forEach(student => {
                if (keyStudent === Object.values(student)[Object.keys(student).indexOf(key)]) {
                    newArrStudents.push(student);
                    copyStudentsArr.splice(copyStudentsArr.indexOf(student), 1);
                }
            })
        })

        return newArrStudents;
    }

    // Поиск по массмиву

    function searchInArr(key, input) {
        const copyStudentsArr = copyStudent().copyStudentsArr;
        const keyArr = [];
        const newArrStudents = [];
            
        if (key === 'studyDate' || key === 'endStudyDate') {
            copyStudentsArr.forEach(student => {
                if (typeof(student.studyDate) === 'number') {
                    student.studyDate  = '' + student.dateStudy;
                }
                if (typeof(student.endStudyDate) === 'number') {
                    student.endStudyDate = '' + student.endStudyDate;
                }
            })
        } 

        copyStudentsArr.forEach(student => keyArr.push(Object.values(student)[Object.keys(student).indexOf(key)]));
        
        keyArr.forEach(keyObj => {
            copyStudentsArr.forEach(student => {
                
                if (keyObj.includes(input)) {
                    newArrStudents.push(student);
                    copyStudentsArr.splice(copyStudentsArr.indexOf(student), 1);
                } else {
                    copyStudentsArr.splice(copyStudentsArr.indexOf(student), 1)
                }
            })
        })

        return newArrStudents;
    }

    document.addEventListener('DOMContentLoaded', () => {

        const formAddStudent = createAddedStudentForm();
        const inputArr = [formAddStudent.addStudentSurname, formAddStudent.addStudentName, formAddStudent.addStudentMiddlename, formAddStudent.addStudentBirthDate, formAddStudent.addStudentStudyDate, formAddStudent.addStudentFaculty];
        const formFilteredStudent = createFiltredForm();
        const formFilteredInput = [formFilteredStudent.filtredStudentName, formFilteredStudent.filtredStudentStartStudy, formFilteredStudent.filtredStudentEndStudy, formFilteredStudent.filtredStudentFaculty];
        const table = createStartTable();

        let newArr = JSON.parse(localStorage.getItem('base'));

        if (newArr !== null) {
            newArr.forEach(student => students.push(student));
            createTableRow(table, students);
        }

        formAddStudent.formAddedStudent.addEventListener('submit', (e) => {
            e.preventDefault();

            if (hasValue(inputArr) && validateDate(formAddStudent) && ((new Date(formAddStudent.addStudentBirthDate.value)).getFullYear() < formAddStudent.addStudentStudyDate.value)) {
                addStudentToArr(formAddStudent);
                inputArr.forEach(input => {
                    addValidateNotice(input);
                });
                createTableRow(table, students);
                localStorage.removeItem('base');
                localStorage.setItem('base', JSON.stringify(students));
            } else {
                validateForm(inputArr, formAddStudent);
            }
        });

        table.trHead.addEventListener('click', (e) => {
            let target = e.target;

            let key = target.dataset.key;
            createTableRow(table, sortTable(key));
        })

        formFilteredStudent.filtredStudentForm.addEventListener('submit', (e) => e.preventDefault());
        formFilteredStudent.filtredStudentForm.addEventListener('input', (e) => {
            target = e.target;
            key = target.dataset.key;
            input = target.value.split(' ').join('').toLowerCase();

            console.log(key + ' ' + input);
            if (searchInArr(key, input).length == 0) {
                table.tbody.innerHTML = ''
                const trBody = document.createElement('tr');
                table.tbody.append(trBody);
                const tdBody = document.createElement('td');
                trBody.append(tdBody);
                tdBody.setAttribute('colspan', '4');
                tdBody.innerHTML = 'Студент с такими данными отсутствует. Повторите попытку с другими вводными.';
            } else createTableRow(table, searchInArr(key, input));
        });

        table.deleteBtn.addEventListener('click', () => {
            question = confirm('Вы уверены?');
            if (question) {
                localStorage.removeItem('base');
                students.splice(0);
                table.tbody.innerHTML = ''
                const trBody = document.createElement('tr');
                table.tbody.append(trBody);
                const tdBody = document.createElement('td');
                trBody.append(tdBody);
                tdBody.setAttribute('colspan', '4');
                tdBody.innerHTML = 'Список студентов пуст. Заполните форму, чтобы добавить студента';
            }
        });

        formFilteredStudent.removeTableBtn.addEventListener('click', () => {
            createTableRow(table, students);
        })

        formFilteredStudent.clearFiltredInputBtn.addEventListener('click', () => {
            formFilteredInput.forEach(input => input.value = '');
            createTableRow(table, students);
        })
    })
})()