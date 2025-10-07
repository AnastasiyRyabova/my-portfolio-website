// База данных
let listData =[
    {
        name: 'Анастасия',
        surname: 'Рябова',
        middleName: 'Вячеслававна',
        date: 25,
        startStudy: 2021,
        finishStudy: 2025,
        faculty: 'IT'
    },
    {
        name: 'Анна',
        surname: 'Иванова',
        middleName: 'Владимировна',
        date: 23,
        startStudy: 2023,
        finishStudy: 2027,
        faculty: 'Дизайн'
    },
    {
        name: 'Вера',
        surname: 'Сергеева',
        middleName: 'Игоревна',
        date: 27,
        startStudy: 2022,
        finishStudy: 2026,
        faculty: 'Психология'
    },
    {
        name: 'Игорь',
        surname: 'Власов',
        middleName: 'Матвеевич',
        date: 20,
        startStudy: 2022,
        finishStudy: 2026,
        faculty: 'Логистика'
    },
    {
        name: 'Сергей',
        surname: 'Майоров',
        middleName: 'Константинович',
        date: 25,
        startStudy: 2021,
        finishStudy: 2025,
        faculty: 'IT'
    }

];

let sortColumnFlag = 'fio',
    sortDirFlag = true;

//Создание элементов
const $app = document.getElementById('app'),
   $addForm = document.getElementById('add-form'),
   $nameInp = document.getElementById('add-form__name-inp'),
   $surnameInp = document.getElementById('add-for__surname-inp'),
   $middlnameInp = document.getElementById('add-form__middlname-inp'),
   $dateInp = document.getElementById('add-form__date-inp'),
   $startInp = document.getElementById('add-form__start-inp'),
   $finishInp = document.getElementById('add-form__finish-inp'),
   $facultyInp = document.getElementById('add-form__faculty-inp'),

   $filterForm = document.getElementById('filter-form'),
   $fioFilterForm = document.getElementById('filter-form__fio-inp'),
   $facultyFilterForm = document.getElementById('filter-form__faculty-inp'),

   $sortFIOBtn = document.getElementById('sort__fio'),
   $sortDateBtn = document.getElementById('sort__date'),
   $table = document.createElement('table'),
   $tableHead = document.createElement('thead'),
   $tableBody = document.createElement('tbody'),

   $tableHeadTr = document.createElement('tr'),
   $tableHeadThFIO = document.createElement('th'),
   $tableHeadThAge = document.createElement('th'),
   $tableHeadThBithYear = document.createElement('th'),
   $tableHeadThStart = document.createElement('th'),
   $tableHeadThFinish = document.createElement('th'),
   $tableHeadThFaculty = document.createElement('th');

$table.classList.add('table', 'table-success', 'table-striped');

$tableHeadThFIO.textContent = 'ФИО';
$tableHeadThAge.textContent = 'Возраст';
$tableHeadThBithYear.textContent = 'Дата рождения';
$tableHeadThStart.textContent = 'Начало учёбы';
$tableHeadThFinish.textContent = 'Окончание учёбы';
$tableHeadThFaculty.textContent = 'Факультет';



$tableHeadTr.append($tableHeadThFIO);
$tableHeadTr.append($tableHeadThAge);
$tableHeadTr.append($tableHeadThBithYear);
$tableHeadTr.append($tableHeadThStart);
$tableHeadTr.append($tableHeadThFinish);
$tableHeadTr.append($tableHeadThFaculty);
   
$tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);
$app.append($table);

function createUserTr(oneUser){
    const $userTr = document.createElement('tr'),
       $userFIO = document.createElement('th'),
       $userAge = document.createElement('th'),
       $userBithYear = document.createElement('th'),
       $userStart = document.createElement('th'),
       $userFinish = document.createElement('th'),
       $userFaculty = document.createElement('th');

   $userFIO.textContent = oneUser.fio;
   $userAge.textContent = oneUser.date;
   $userBithYear.textContent = oneUser.BithYear;
   $userStart.textContent = oneUser.startStudy;
   $userFinish.textContent = oneUser.finishStudy;
   $userFaculty.textContent = oneUser.faculty;

   $userTr.append($userFIO);
   $userTr.append($userAge);
   $userTr.append($userBithYear);
   $userTr.append($userStart);
   $userTr.append($userFinish);
   $userTr.append($userFaculty);

   return $userTr;
}

//Фильтрация
function filter(arr, prop, value){
     return arr.filter(function(oneUser){
        if (oneUser[prop].includes(value.trim())) return true
    });
}
// Рендер 
function render(arrData) {
    $tableBody.innerHTML = '';
//Подготовка 
let copyListData = [...arrData];
for(const oneUser of copyListData) {
  oneUser.fio = oneUser.name + ' ' + oneUser.surname + ' ' + oneUser.middleName;
  oneUser.BithYear = 2024 - oneUser.date;
}

//Сортировка
copyListData = copyListData.sort(function(a, b){
  let sort = a[sortColumnFlag] < b[sortColumnFlag];

  if(sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag];
  if(sort) return -1;
});

//Фильтрация
if ($fioFilterForm.value.trim() !==""){
    copyListData = filter(copyListData, 'fio', $fioFilterForm.value)
}
if ($facultyFilterForm.value.trim() !==""){
    copyListData = filter(copyListData, 'faculty', $facultyFilterForm.value)
}

//Отрисовка
for(const oneUser of copyListData) {
    const $newTr = createUserTr(oneUser);
     $tableBody.append($newTr);
}

}

render(listData);

//Добавление
$addForm.addEventListener('submit', function(event){
    event.preventDefault();
   
//Валидация 
    if($nameInp.value.trim() == ""){
        alert('Имя не введено!');
        return;
    }
    if($surnameInp.value.trim() == ""){
        alert('Фамилия не введена!');
        return;
    }
    if($middlnameInp.value.trim() == ""){
        alert('Отчество не введено!');
        return;
    }
    if($dateInp.value.trim() == ""){
        alert('Возраст не введён!');
        return;
    }
    if($startInp.value.trim() == ""){
        alert('Начало учёбы не введено!');
        return;
    }
    if($finishInp.value.trim() == ""){
        alert('Окончание учёбы не введено!');
        return;
    }
    if($facultyInp.value.trim() == ""){
        alert('Факультет не введен!');
        return;
    }

  listData.push({
    name: $nameInp.value.trim(),
    surname: $surnameInp.value.trim(),
    middleName: $middlnameInp.value.trim(),
    date: parseInt($dateInp.value.trim()),
    startStudy: parseInt($startInp.value.trim()),
    finishStudy: parseInt($finishInp.value.trim()),
    faculty: $facultyInp.value.trim()
  });

  render(listData);
});

//Клики сортировки 
$sortFIOBtn.addEventListener('click', function() {
    sortColumnFlag = 'fio';
    sortDirFlag = !sortDirFlag;
    render(listData);
});
$sortDateBtn.addEventListener('click', function() {
    sortColumnFlag = 'date';
    sortDirFlag = !sortDirFlag;
    render(listData);
});

//Фильтр 

$filterForm.addEventListener('submit', function(event){
    event.preventDefault();
});

$fioFilterForm.addEventListener('input', function(){
   render(listData);
});

$facultyFilterForm.addEventListener('input', function(){
    render(listData);
 });