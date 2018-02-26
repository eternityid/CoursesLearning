import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const courses = [
      { id: 1, teacherName: 'Pattie Higginbottom', description: 'English', amoutOfStudents: '20'},
      { id: 2, teacherName: 'Hettie Bluford', description: 'English', amoutOfStudents: '20' },
      { id: 3, teacherName: 'Ella Croyle', description: 'Mathematics', amoutOfStudents: '20' },
      { id: 4, teacherName: 'Alma Kump', description: 'Mathematics', amoutOfStudents: '20' },
      { id: 5, teacherName: 'Tina Holston', description: 'Accounting & Finance', amoutOfStudents: '20' },
      { id: 6, teacherName: 'Brianne Criddle', description: 'Accounting & Finance', amoutOfStudents: '20' },
      { id: 7, teacherName: 'Clorinda Tibbets', description: 'Aeronautical & Manufacturing Engineering', amoutOfStudents: '20' },
      { id: 8, teacherName: 'Toni Tapley', description: 'Aeronautical & Manufacturing Engineering', amoutOfStudents: '20' },
      { id: 9, teacherName: 'Zoe Barrios', description: 'Aeronautical & Manufacturing Engineering', amoutOfStudents: '20' },
      { id: 10, teacherName: 'Troy Bunner', description: 'Anatomy & Physiology', amoutOfStudents: '20' },
      { id: 11, teacherName: 'Newton Otoole', description: 'Architecture', amoutOfStudents: '20' },
      { id: 12, teacherName: 'Ayako Bowen', description: 'Architecture', amoutOfStudents: '20' },
      { id: 13, teacherName: 'Gerri Hollar', description: 'Architecture', amoutOfStudents: '20' },
      { id: 14, teacherName: 'Rosalina Vanguilder', description: 'Architecture', amoutOfStudents: '20' },
      { id: 15, teacherName: 'Cristal Larkins', description: 'Chemical Engineering', amoutOfStudents: '20' },
      { id: 16, teacherName: 'Leeanne Calles', description: 'Food Science', amoutOfStudents: '20' },
      { id: 17, teacherName: 'Retha Schlosser', description: 'Geography & Environmental Sciences', amoutOfStudents: '20' },
      { id: 18, teacherName: 'Celesta Zona', description: 'History of Art, Architecture & Design', amoutOfStudents: '20' },
      { id: 19, teacherName: 'Garland Weideman', description: 'Materials Technology', amoutOfStudents: '20' },
      { id: 20, teacherName: 'Sonny Glueck', description: 'Robotics', amoutOfStudents: '20' }
    ];
    return {courses};
  }

}