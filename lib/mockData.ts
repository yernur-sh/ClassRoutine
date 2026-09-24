import { LessonItem, AchievementItem, ChatMessage, HomeworkItem, AnnouncementItem, ParentConsultation, StudentAttendanceAndGrade, BreakExercise, QuizQuestion, UserProfile } from './types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'teacher-1',
    name: 'Айнұр Маратқызы Қасымова',
    email: 'ainur.kasymova@school.kz',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    subject: 'Математика пәні және Сынып жетекшісі',
    phone: '+7 (701) 555-12-34',
    classId: '7-A',
  },
  {
    id: 'student-1',
    name: 'Арман Сейітов',
    email: 'arman.seitov@school.kz',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    classId: '7-A',
    points: 1450,
  },
  {
    id: 'parent-1',
    name: 'Сейіт Қасымұлы (Арманның әкесі)',
    email: 'seit.kasymuly@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    studentId: 'student-1',
    studentName: 'Арман Сейітов',
    phone: '+7 (777) 345-67-89',
    classId: '7-A',
  },
];

export const CLASS_STUDENTS = [
  { id: 'student-1', name: 'Арман Сейітов', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', points: 1450, rank: 2, achievementsCount: 8, badge: 'Сынып старостасы' },
  { id: 'student-2', name: 'Адина Нұрланқызы', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', points: 1680, rank: 1, achievementsCount: 11, badge: 'Олимпиада жеңімпазы' },
  { id: 'student-3', name: 'Санжар Болатов', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', points: 1320, rank: 3, achievementsCount: 6, badge: 'Спорт шебері' },
  { id: 'student-4', name: 'Айзере Мұратқызы', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', points: 1290, rank: 4, achievementsCount: 7, badge: 'Үздік оқырман' },
  { id: 'student-5', name: 'Бексұлтан Төлеген', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', points: 1180, rank: 5, achievementsCount: 5, badge: 'IT зерттеушісі' },
  { id: 'student-6', name: 'Дәурен Ермекұлы', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', points: 1040, rank: 6, achievementsCount: 4, badge: 'Робототехника' },
  { id: 'student-7', name: 'Дильназ Серікқызы', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', points: 990, rank: 7, achievementsCount: 4, badge: 'Эколог-зерттеуші' },
  { id: 'student-8', name: 'Мадияр Әлиев', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', points: 910, rank: 8, achievementsCount: 3, badge: 'Белсенді спортшы' },
];

export const INITIAL_SCHEDULE: LessonItem[] = [
  // Дүйсенбі (Monday)
  { id: 'mon-1', day: 'monday', lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ тілі мен әдебиеті', teacher: 'Гүлнәр Бақытқызы', room: '№204 каб.', color: 'emerald', notes: 'Ережелер дәптері мен сөздік' },
  { id: 'mon-2', day: 'monday', lessonNumber: 2, time: '09:25 - 10:10', subject: 'Алгебра', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'blue', notes: '№142-146 есептерді тексеру' },
  { id: 'mon-3', day: 'monday', lessonNumber: 3, time: '10:25 - 11:10', subject: 'Қазақстан тарихы', teacher: 'Ержан Серікұлы', room: '№215 каб.', color: 'amber', notes: '§12 тақырыбын оқып келу' },
  { id: 'mon-4', day: 'monday', lessonNumber: 4, time: '11:25 - 12:10', subject: 'Ағылшын тілі', teacher: 'Меруерт Қайратқызы', room: '№108 каб.', color: 'indigo', notes: 'Unit 4 vocabulary test' },
  { id: 'mon-5', day: 'monday', lessonNumber: 5, time: '12:20 - 13:05', subject: 'Информатика', teacher: 'Бауыржан Дәулетұлы', room: '№402 каб.', color: 'cyan', notes: 'Python циклдар практикасы' },
  { id: 'mon-6', day: 'monday', lessonNumber: 6, time: '13:15 - 14:00', subject: 'Дене шынықтыру', teacher: 'Талғат Нұрпейісұлы', room: 'Үлкен спортзал', color: 'orange', notes: 'Спорттық киім мен кроссовка' },

  // Сейсенбі (Tuesday)
  { id: 'tue-1', day: 'tuesday', lessonNumber: 1, time: '08:30 - 09:15', subject: 'Физика', teacher: 'Сәкен Омарұлы', room: '№312 каб.', color: 'purple', notes: 'Зертханалық жұмысқа дайындық' },
  { id: 'tue-2', day: 'tuesday', lessonNumber: 2, time: '09:25 - 10:10', subject: 'Геометрия', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'blue', notes: 'Үшбұрыштар теңдігі' },
  { id: 'tue-3', day: 'tuesday', lessonNumber: 3, time: '10:25 - 11:10', subject: 'География', teacher: 'Әлия Жақсылыққызы', room: '№209 каб.', color: 'emerald', notes: 'Атлас және контур карта' },
  { id: 'tue-4', day: 'tuesday', lessonNumber: 4, time: '11:25 - 12:10', subject: 'Орыс тілі', teacher: 'Ольга Николаевна', room: '№206 каб.', color: 'rose', notes: 'Шығармаға дайындық' },
  { id: 'tue-5', day: 'tuesday', lessonNumber: 5, time: '12:20 - 13:05', subject: 'Биология', teacher: 'Жанар Мұратқызы', room: '№310 каб.', color: 'green', notes: 'Жасуша құрылысы микроскоппен' },
  { id: 'tue-6', day: 'tuesday', lessonNumber: 6, time: '13:15 - 14:00', subject: 'Сынып сағаты', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'violet', notes: '«Білімді ұрпақ – ел болашағы»' },

  // Сәрсенбі (Wednesday)
  { id: 'wed-1', day: 'wednesday', lessonNumber: 1, time: '08:30 - 09:15', subject: 'Алгебра', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'blue', notes: 'Көпмүшелерді көбейткіштерге жіктеу' },
  { id: 'wed-2', day: 'wednesday', lessonNumber: 2, time: '09:25 - 10:10', subject: 'Қазақ тілі', teacher: 'Гүлнәр Бақытқызы', room: '№204 каб.', color: 'emerald', notes: 'Синтаксистік талдау' },
  { id: 'wed-3', day: 'wednesday', lessonNumber: 3, time: '10:25 - 11:10', subject: 'Дүниежүзі тарихы', teacher: 'Ержан Серікұлы', room: '№215 каб.', color: 'amber', notes: 'Орта ғасырлар тарихы' },
  { id: 'wed-4', day: 'wednesday', lessonNumber: 4, time: '11:25 - 12:10', subject: 'Химияға кіріспе', teacher: 'Раушан Асылбекқызы', room: '№315 каб.', color: 'teal', notes: 'Заттардың қасиеттері' },
  { id: 'wed-5', day: 'wednesday', lessonNumber: 5, time: '12:20 - 13:05', subject: 'Ағылшын тілі', teacher: 'Меруерт Қайратқызы', room: '№108 каб.', color: 'indigo', notes: 'Grammar: Present Perfect' },
  { id: 'wed-6', day: 'wednesday', lessonNumber: 6, time: '13:15 - 14:00', subject: 'Көркем еңбек', teacher: 'Мақсат Сапарұлы', room: '№101 шеберхана', color: 'yellow', notes: 'Жобалық жұмыс материалдары' },

  // Бейсенбі (Thursday)
  { id: 'thu-1', day: 'thursday', lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ әдебиеті', teacher: 'Гүлнәр Бақытқызы', room: '№204 каб.', color: 'emerald', notes: '«Қобыланды батыр» жыры' },
  { id: 'thu-2', day: 'thursday', lessonNumber: 2, time: '09:25 - 10:10', subject: 'Физика', teacher: 'Сәкен Омарұлы', room: '№312 каб.', color: 'purple', notes: 'Тығыздық пен масса есептері' },
  { id: 'thu-3', day: 'thursday', lessonNumber: 3, time: '10:25 - 11:10', subject: 'Информатика', teacher: 'Бауыржан Дәулетұлы', room: '№402 каб.', color: 'cyan', notes: 'Алгоритмдер және функциялар' },
  { id: 'thu-4', day: 'thursday', lessonNumber: 4, time: '11:25 - 12:10', subject: 'Геометрия', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'blue', notes: 'Сызғыш және циркуль қажет' },
  { id: 'thu-5', day: 'thursday', lessonNumber: 5, time: '12:20 - 13:05', subject: 'Дене шынықтыру', teacher: 'Талғат Нұрпейісұлы', room: 'Үлкен спортзал', color: 'orange', notes: 'Волейбол ойындары' },
  { id: 'thu-6', day: 'thursday', lessonNumber: 6, time: '13:15 - 14:00', subject: 'Музыка', teacher: 'Салтанат Қанатқызы', room: '№114 каб.', color: 'pink', notes: 'Күй тыңдау және талдау' },

  // Жұма (Friday)
  { id: 'fri-1', day: 'friday', lessonNumber: 1, time: '08:30 - 09:15', subject: 'Алгебра', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'blue', notes: 'БЖБ (Бөлім бойынша жиынтық бағалау)' },
  { id: 'fri-2', day: 'friday', lessonNumber: 2, time: '09:25 - 10:10', subject: 'Биология', teacher: 'Жанар Мұратқызы', room: '№310 каб.', color: 'green', notes: 'Өсімдіктер мен жануарлар әлемі' },
  { id: 'fri-3', day: 'friday', lessonNumber: 3, time: '10:25 - 11:10', subject: 'Қазақстан тарихы', teacher: 'Ержан Серікұлы', room: '№215 каб.', color: 'amber', notes: 'Тарихи карталармен жұмыс' },
  { id: 'fri-4', day: 'friday', lessonNumber: 4, time: '11:25 - 12:10', subject: 'Ағылшын тілі', teacher: 'Меруерт Қайратқызы', room: '№108 каб.', color: 'indigo', notes: 'Speaking club & presentation' },
  { id: 'fri-5', day: 'friday', lessonNumber: 5, time: '12:20 - 13:05', subject: 'География', teacher: 'Әлия Жақсылыққызы', room: '№209 каб.', color: 'emerald', notes: 'Қазақстанның климаты' },
  { id: 'fri-6', day: 'friday', lessonNumber: 6, time: '13:15 - 14:00', subject: 'Факультатив: Жас эрудит', teacher: 'Айнұр Маратқызы', room: '№304 каб.', color: 'violet', notes: 'Олимпиадалық логикалық есептер' },

  // Сенбі (Saturday - үйірмелер мен таңдау курстары)
  { id: 'sat-1', day: 'saturday', lessonNumber: 1, time: '09:00 - 09:45', subject: 'Робототехника және STEM', teacher: 'Бауыржан Дәулетұлы', room: '№405 STEM каб.', color: 'cyan', notes: 'Arduino жобалары' },
  { id: 'sat-2', day: 'saturday', lessonNumber: 2, time: '09:55 - 10:40', subject: 'Тоғызқұмалақ және Шахмат', teacher: 'Талғат Нұрпейісұлы', room: 'Шахмат клубы', color: 'orange', notes: 'Сыныпішілік турнир' },
  { id: 'sat-3', day: 'saturday', lessonNumber: 3, time: '10:50 - 11:35', subject: 'Шешендік өнер және дебат', teacher: 'Гүлнәр Бақытқызы', room: '№204 каб.', color: 'emerald', notes: 'Дебат форматындағы пікірталас' },
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    studentId: 'student-2',
    studentName: 'Адина Нұрланқызы',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    title: 'Қалалық Математика Олимпиадасы 1-орын',
    category: 'olympiad',
    categoryLabel: 'Олимпиада жеңісі',
    description: 'Алматы қаласы мектеп оқушылары арасындағы пәндік олимпиадада 1-ші дәрежелі Дипломмен марапатталды.',
    date: '2026-09-18',
    points: 300,
    badgeIcon: 'Trophy',
    medalType: 'gold',
    teacherName: 'Айнұр Маратқызы',
  },
  {
    id: 'ach-2',
    studentId: 'student-1',
    studentName: 'Арман Сейітов',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    title: '«Жүзден жүйрік» STEM жобалар көрмесі жеңімпазы',
    category: 'science',
    categoryLabel: 'Ғылым және STEM',
    description: '«Ақылды мектеп» атты экологиялық автоматтандыру жобасымен үздік деп танылды.',
    date: '2026-09-20',
    points: 250,
    badgeIcon: 'Award',
    medalType: 'gold',
    teacherName: 'Бауыржан Дәулетұлы',
  },
  {
    id: 'ach-3',
    studentId: 'student-3',
    studentName: 'Санжар Болатов',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Тоғызқұмалақтан аудандық турнир 2-орын',
    category: 'sport',
    categoryLabel: 'Спорттық жетістік',
    description: 'Аудан мектептері арасындағы ұлттық ойын жарысында күміс жүлдегер атанды.',
    date: '2026-09-15',
    points: 200,
    badgeIcon: 'Medal',
    medalType: 'silver',
    teacherName: 'Талғат Нұрпейісұлы',
  },
  {
    id: 'ach-4',
    studentId: 'student-4',
    studentName: 'Айзере Мұратқызы',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: '«Абай оқулары» байқауы 1-орын',
    category: 'art',
    categoryLabel: 'Өнер және мәдениет',
    description: 'Абай Құнанбайұлының қара сөздері мен өлеңдерін мәнерлеп оқу бойынша бас жүлдені иеленді.',
    date: '2026-09-12',
    points: 220,
    badgeIcon: 'Sparkles',
    medalType: 'gold',
    teacherName: 'Гүлнәр Бақытқызы',
  },
  {
    id: 'ach-5',
    studentId: 'student-5',
    studentName: 'Бексұлтан Төлеген',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    title: '«Алтын дәптер» мінсіз тәртіп және сабаққа толық қатысу',
    category: 'discipline',
    categoryLabel: 'Үлгілі тәртіп',
    description: '1-ші айда бірде-бір сабақтан қалмай, үй тапсырмаларын уақытылы үздік орындағаны үшін.',
    date: '2026-09-22',
    points: 150,
    badgeIcon: 'Star',
    medalType: 'special',
    teacherName: 'Айнұр Маратқызы',
  },
  {
    id: 'ach-6',
    studentId: 'student-1',
    studentName: 'Арман Сейітов',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    title: '«Кітап – білім бұлағы» марафонының көшбасшысы',
    category: 'reading',
    categoryLabel: 'Үздік оқырман',
    description: 'Биылғы оқу жылында 15 көркем әдебиет кітабын оқып, қысқаша шолу жазғаны үшін.',
    date: '2026-09-21',
    points: 180,
    badgeIcon: 'BookOpen',
    medalType: 'bronze',
    teacherName: 'Гүлнәр Бақытқызы',
  },
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: '📢 1-тоқсандық ата-аналар жиналысы өткізіледі',
    content: 'Құрметті ата-аналар! Келесі жұма күні сағат 18:30-да мектеп акт залында және Zoom арқылы 7 «А» сыныбының оқу үлгерімі, тәртібі және алдағы іс-шараларға арналған тоқсандық жиналысы өтеді. Барлықтарыңыздың қатысуларыңыз маңызды!',
    date: '2026-09-23',
    author: 'Айнұр Маратқызы (Сынып жетекшісі)',
    authorRole: 'teacher',
    targetAudience: 'parents',
    important: true,
    category: 'Жиналыс',
  },
  {
    id: 'ann-2',
    title: '🏆 Алматы музейіне танымдық саяхат (Экскурсия)',
    content: 'Сенбі күні 7 «А» сыныбы оқушыларымен бірге Орталық Мемлекеттік Музейге танымдық саяхат ұйымдастырылады. Жинақталу орны: мектеп ауласында сағат 10:00-де. Ата-аналардың келісімі чат арқылы жіберілсін.',
    date: '2026-09-22',
    author: 'Ержан Серікұлы (Тарих пәні)',
    authorRole: 'teacher',
    targetAudience: 'all',
    important: false,
    category: 'Экскурсия',
  },
  {
    id: 'ann-3',
    title: '💡 Алгебра бойынша БЖБ нәтижелері шықты',
    content: 'Оқушылар назарына! «Бірмүшелер мен көпмүшелер» бөлімі бойынша БЖБ бағалары порталға енгізілді. Қателермен жұмыс сейсенбі күні факультатив кезінде жүргізіледі.',
    date: '2026-09-24',
    author: 'Айнұр Маратқызы',
    authorRole: 'teacher',
    targetAudience: 'students',
    important: true,
    category: 'Бағалау',
  },
];

export const INITIAL_HOMEWORK: HomeworkItem[] = [
  {
    id: 'hw-1',
    subject: 'Алгебра',
    title: '§14. Көпмүшені көбейткіштерге жіктеу тәсілдері',
    description: 'Оқулықтағы №154, №156, №159 (тақ нөмірлері) есептерін орындау. Топтау тәсілін қолданып шығару жолдарын дәптерге толық жазып, фотосын немесе жауабын осында жүктеңіз.',
    assignedDate: '2026-09-23',
    dueDate: '2026-09-26',
    teacherName: 'Айнұр Маратқызы',
    teacherId: 'teacher-1',
    attachments: [
      { name: 'Алгебра_7сынып_№154-159_үлгісі.pdf', url: '#' }
    ],
    submissions: [
      {
        studentId: 'student-1',
        studentName: 'Арман Сейітов',
        submittedDate: '2026-09-24 10:30',
        content: 'Барлық есептер шығарылды. 159-есептегі екінші мысалда ортақ көбейткішті жақша сыртына шығардым.',
        grade: 10,
        feedback: 'Жарайсың, Арман! Барлық есептер дұрыс орындалған, өте тиянақты жазылған.',
        status: 'graded',
      },
      {
        studentId: 'student-2',
        studentName: 'Адина Нұрланқызы',
        submittedDate: '2026-09-24 11:15',
        content: 'Үй жұмысы орындалды. Талдау кестесі қоса тіркелді.',
        grade: 10,
        feedback: 'Мінсіз жұмыс, тамаша!',
        status: 'graded',
      }
    ]
  },
  {
    id: 'hw-2',
    subject: 'Қазақ әдебиеті',
    title: '«Қобыланды батыр» жырынан үзіндіні мәнерлеп оқу',
    description: 'Жырдың Тайбурылдың шабысы суреттелген бөлімін мәнерлеп оқып, батырлар жырындағы эпитеттер мен гиперболаларды дәптерге жазып келу.',
    assignedDate: '2026-09-22',
    dueDate: '2026-09-25',
    teacherName: 'Гүлнәр Бақытқызы',
    teacherId: 'teacher-2',
    submissions: [
      {
        studentId: 'student-1',
        studentName: 'Арман Сейітов',
        submittedDate: '2026-09-23 16:40',
        content: 'Эпитеттер: «Қара қасқа арғымақ», «Құрыш найза». Гипербола: «Аяғы жерге тимейді, құстай ұшып келеді».',
        status: 'submitted',
      }
    ]
  },
  {
    id: 'hw-3',
    subject: 'Информатика',
    title: 'Python: For және While циклдарын қолданып программа құру',
    description: '1-ден N-ге дейінгі сандардың қосындысын және тақ сандардың көбейтіндісін табатын программа жазып, кодын осында жіберіңіз.',
    assignedDate: '2026-09-24',
    dueDate: '2026-09-28',
    teacherName: 'Бауыржан Дәулетұлы',
    teacherId: 'teacher-3',
    submissions: []
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  // Жалпы сынып чаты
  {
    id: 'msg-1',
    senderId: 'teacher-1',
    senderName: 'Айнұр Маратқызы',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    channel: 'general',
    content: 'Сәлеметсіздер ме, 7 «А» оқушылары! Бүгінгі сабақ кестесінде өзгеріс жоқ. Барлықтарыңыз үй тапсырмасын уақытылы жүктеңіздер.',
    timestamp: '2026-09-24 08:05',
  },
  {
    id: 'msg-2',
    senderId: 'student-1',
    senderName: 'Арман Сейітов',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    channel: 'general',
    content: 'Қайырлы таң, Айнұр апай! Біз алгебра бойынша үй тапсырмаларын орындап қойдық.',
    timestamp: '2026-09-24 08:12',
  },
  {
    id: 'msg-3',
    senderId: 'student-2',
    senderName: 'Адина Нұрланқызы',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    channel: 'general',
    content: 'Сенбі күнгі олимпиадаға дайындық сабағы сағат нешеде болады?',
    timestamp: '2026-09-24 08:20',
  },
  {
    id: 'msg-4',
    senderId: 'teacher-1',
    senderName: 'Айнұр Маратқызы',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    channel: 'general',
    content: 'Адина, олимпиада курсы сенбі күні сағат 11:45-те 304 кабинетте басталады.',
    timestamp: '2026-09-24 08:25',
  },

  // Пәндік сұрақ-жауап
  {
    id: 'qa-1',
    senderId: 'student-3',
    senderName: 'Санжар Болатов',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    channel: 'qa',
    content: 'Мұғалім, Физикадан 5-зертханалық жұмыста динамикалық күш формуласын қалай есептейміз?',
    timestamp: '2026-09-24 09:40',
  },
  {
    id: 'qa-2',
    senderId: 'teacher-1',
    senderName: 'Айнұр Маратқызы',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    channel: 'qa',
    content: 'Санжар, F = m * a формуласын қолданасың. Массаны кг-ға, үдеуді м/с²-қа аударуды ұмытпаңыз!',
    timestamp: '2026-09-24 09:48',
  },

  // Ата-ана мен мұғалім байланысы
  {
    id: 'pt-1',
    senderId: 'parent-1',
    senderName: 'Сейіт Қасымұлы (Арманның әкесі)',
    senderRole: 'parent',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    channel: 'parent-teacher',
    recipientId: 'teacher-1',
    recipientName: 'Айнұр Маратқызы',
    content: 'Сәлеметсіз бе, Айнұр Маратқызы! Арманның соңғы тоқсандағы алгебра және информатикадан жетістіктері өте жақсы екен. Сенбі күнгі математикалық үйірмеге қосымша қатыстырғымыз келеді, орын бар ма?',
    timestamp: '2026-09-23 18:20',
  },
  {
    id: 'pt-2',
    senderId: 'teacher-1',
    senderName: 'Айнұр Маратқызы',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    channel: 'parent-teacher',
    recipientId: 'parent-1',
    recipientName: 'Сейіт Қасымұлы',
    content: 'Сәлеметсіз бе, Сейіт мырза! Иә, әрине, Арман өте зерек, олимпиада тобына қуана қабылдаймыз. Сенбі күні 11:45-те келуіне болады.',
    timestamp: '2026-09-23 19:05',
  },
];

export const INITIAL_PARENT_CONSULTATIONS: ParentConsultation[] = [
  {
    id: 'cons-1',
    parentId: 'parent-1',
    parentName: 'Сейіт Қасымұлы',
    studentName: 'Арман Сейітов',
    teacherId: 'teacher-1',
    teacherName: 'Айнұр Маратқызы',
    topic: 'Оқушының республикалық ғылыми жобалар жарысына дайындығын талқылау',
    requestedDate: '2026-09-26',
    timeSlot: '15:30 - 16:00',
    status: 'accepted',
    notes: 'Кабинет №304 немесе телефон арқылы кеңес.',
  },
  {
    id: 'cons-2',
    parentId: 'parent-2',
    parentName: 'Нұргүл Ахметова (Адинаның анасы)',
    studentName: 'Адина Нұрланқызы',
    teacherId: 'teacher-1',
    teacherName: 'Айнұр Маратқызы',
    topic: 'Халықаралық олимпиадаға қатысу бағдарламасы туралы',
    requestedDate: '2026-09-28',
    timeSlot: '16:00 - 16:30',
    status: 'pending',
  }
];

export const STUDENT_PROGRESS_DATA: StudentAttendanceAndGrade = {
  studentId: 'student-1',
  studentName: 'Арман Сейітов',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  attendanceRate: 98,
  averageGrade: 4.9,
  subjects: [
    { name: 'Алгебра', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Тақырыпты терең меңгерген, есеп шығару жылдамдығы жоғары' },
    { name: 'Геометрия', grade: 5, faGrade: '9/10', attendance: 'қатысты', teacherNote: 'Сызбалармен жұмыс өте сапалы' },
    { name: 'Физика', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Зертханалық жұмыстарды белсенді орындайды' },
    { name: 'Қазақ тілі', grade: 5, faGrade: '9/10', attendance: 'қатысты', teacherNote: 'Сауаттылық деңгейі жоғары' },
    { name: 'Қазақ әдебиеті', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Көркем шығармаларды талдай біледі' },
    { name: 'Информатика', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Python алгоритмдерін шебер жазады' },
    { name: 'Ағылшын тілі', grade: 4, faGrade: '8/10', attendance: 'қатысты', teacherNote: 'Сөздік қорын көбейту ұсынылады' },
    { name: 'Қазақстан тарихы', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Тарихи оқиғаларды жақсы біледі' },
    { name: 'Дене шынықтыру', grade: 5, faGrade: '10/10', attendance: 'қатысты', teacherNote: 'Нормативтерді үздік тапсырады' },
  ],
  recentTeacherNotes: [
    {
      date: '2026-09-24',
      teacher: 'Айнұр Маратқызы (Математика)',
      subject: 'Алгебра',
      note: 'Арман бүгінгі сабақта жаңа формулаларды алғашқы болып дәлелдеп, сыныптастарына көмектесті. Жарайсың!',
      type: 'praise',
    },
    {
      date: '2026-09-21',
      teacher: 'Бауыржан Дәулетұлы (Информатика)',
      subject: 'Информатика',
      note: 'Сынып аралық код жазу челленджінде 1-орын алды.',
      type: 'praise',
    },
    {
      date: '2026-09-18',
      teacher: 'Меруерт Қайратқызы (Ағылшын тілі)',
      subject: 'Ағылшын тілі',
      note: 'Ауызша сөйлеу мәнері жақсарып келеді, тыңдалым мәтіндерін үйде көбірек тыңдау пайдалы.',
      type: 'recommendation',
    }
  ]
};

export const FUN_BREAK_EXERCISES: BreakExercise[] = [
  {
    id: 'ex-1',
    title: '👀 «Қыран көз» – Көз бұлшықеттеріне арналған жаттығу',
    category: 'eye',
    durationSeconds: 60,
    description: 'Компьютер немесе кітап оқудан шаршаған көздің қысымын түсіріп, көру қабілетін жақсартатын 4 кезеңді гимнастика.',
    steps: [
      '1. Көзді жоғары-төмен 5 рет баяу қозғаңыз.',
      '2. Көзді оңға және солға шегіне дейін 5 рет қаратыңыз.',
      '3. Сағат тілімен және қарсы бағытта көзбен шеңбер сызыңыз (4 рет).',
      '4. Терезеге қарап, 5 метр қашықтағы затқа 10 секунд, кейін жақынға қараңыз.',
      '5. Көзді 5 секунд қатты жұмып, сосын тез-тез жыпылықтатыңыз.'
    ],
    icon: 'Eye',
    bgGradient: 'from-blue-500 to-cyan-500',
    benefits: 'Көздің шаршауын басады, қан айналымын жақсартады және бас ауруының алдын алады.'
  },
  {
    id: 'ex-2',
    title: '🧘 «Түзу тұлға» – Омыртқа мен мойын созу',
    category: 'stretch',
    durationSeconds: 90,
    description: 'Партада ұзақ отырғанда бұлшықет қарысуын шешіп, сергектік сыйлайтын жеңіл қозғалыстар кешені.',
    steps: [
      '1. Орныңыздан тұрып, қолыңызды жоғары көтеріп барынша созылыңыз (10 сек).',
      '2. Мойынды оңға, солға, алға-артқа ақырын иіңіз (әр бағытқа 4 рет).',
      '3. Иықты артқа қарай 8 рет дөңгелетіп қозғаңыз.',
      '4. Қолды белге қойып, денені оңға-солға 5 рет бұрыңыз.',
      '5. Қолды аяқтың ұшына тигізуге тырысып, 10 секунд иіліңіз.'
    ],
    icon: 'Activity',
    bgGradient: 'from-emerald-500 to-teal-500',
    benefits: 'Дұрыс сымбат қалыптастырады, омыртқаға түскен салмақты жеңілдетеді.'
  },
  {
    id: 'ex-3',
    title: '🌬️ «Терең тыныс» – Оттегімен қуаттану',
    category: 'breathing',
    durationSeconds: 45,
    description: 'Мидың белсенділігін арттырып, сабақ алдында зейінді шоғырландыруға көмектесетін тыныс алу техникасы.',
    steps: [
      '1. Түзу отырып, арқаңызды бос ұстаңыз.',
      '2. Мұрынмен 4 секунд бойы терең тыныс алыңыз (ішіңізді толтырып).',
      '3. Тынысыңызды 4 секунд ұстап тұрыңыз.',
      '4. Ауыз арқылы 6 секунд баяу дем шығарыңыз.',
      '5. Жаттығуды 4-5 рет қайталаңыз.'
    ],
    icon: 'Wind',
    bgGradient: 'from-indigo-500 to-purple-500',
    benefits: 'Миды оттегімен қамтамасыз етеді, шаршауды басып, есте сақтауды күшейтеді.'
  },
  {
    id: 'ex-4',
    title: '⚡ «Қос қол үйлесімі» – Нейро-жаттығу',
    category: 'brain',
    durationSeconds: 60,
    description: 'Мидың оң және сол жарты шарларының жұмысын бірдей белсендіретін қызықты саусақ жаттығулары.',
    steps: [
      '1. Оң қолмен мұрныңызды, сол қолмен оң құлағыңызды ұстаңыз.',
      '2. Қол шапалақтап, керісінше: сол қолмен мұрынды, оң қолмен сол құлақты ұстаңыз.',
      '3. Бір қолмен "Класс" (👍), екінші қолмен "Жеңіс" (✌️) белгісін жасап, кезекпен жылдам ауыстырыңыз.',
      '4. Жаттығуды жылдамдата отырып 15-20 рет орындаңыз.'
    ],
    icon: 'Brain',
    bgGradient: 'from-amber-500 to-orange-500',
    benefits: 'Логика мен ойлау жылдамдығын арттырады, зейінді жинақтауға үйретеді.'
  }
];

export const FUN_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: '«Төрт аяқты, бірақ жүре алмайды. Бұл не?»',
    options: ['Үстел / Орындық', 'Машина', 'Жылқы', 'Кітап сөресі'],
    correctIndex: 0,
    explanation: 'Дұрыс! Үстел немесе орындықтың 4 аяғы бар, бірақ ол өздігінен жүрмейді.',
    category: 'Қазақша логикалық жұмбақ'
  },
  {
    id: 'q-2',
    question: 'Бөлмеде 5 шам жанып тұрды. Оның екеуін өшіріп тастады. Бөлмеде неше шам қалды?',
    options: ['3 шам', '5 шам', '2 шам', '0 шам'],
    correctIndex: 1,
    explanation: 'Дұрыс! Бөлмеде бәрібір 5 шам қалады (тек оның 2-уі өшіп тұр, жоғалып кеткен жоқ).',
    category: 'Зейін және логика'
  },
  {
    id: 'q-3',
    question: 'Ағаштың бұтағында 7 құс отырды. Аңшы 1 құсты атып алды. Бұтақта неше құс қалды?',
    options: ['6 құс', '0 құс (қалғандары үркіп ұшып кетті)', '1 құс', '5 құс'],
    correctIndex: 1,
    explanation: 'Өте дұрыс! Мылтық дауысынан қалған барлық құстар үркіп ұшып кетеді.',
    category: 'Қызықты сұрақ'
  },
  {
    id: 'q-4',
    question: 'Қай сөз әрқашан қате жазылады?',
    options: ['Жаңылтпаш', 'Қате сөзінің өзі', 'Мүмкін емес', 'Ереже'],
    correctIndex: 1,
    explanation: 'Керемет! «Қате» сөзі сөздікте «қате» болып жазылады.',
    category: 'Тілдік тапқырлық'
  },
  {
    id: 'q-5',
    question: '1 сағатта 60 минут бар. Ал тәуліктің жартысында неше сағат бар?',
    options: ['24 сағат', '12 сағат', '6 сағат', '18 сағат'],
    correctIndex: 1,
    explanation: 'Дұрыс! 1 тәулік = 24 сағат, жартысы = 12 сағат.',
    category: 'Жылдам математика'
  }
];
