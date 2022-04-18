import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'
import ClassRequest from 'App/Models/ClassRequest'
import ClassStudent from 'App/Models/ClassStudent'
import Lesson from 'App/Models/Lesson'
import User from 'App/Models/User'
import { DateTime, Duration } from 'luxon'

export default class DbSeedSeeder extends BaseSeeder {
  public async run () {
    // admin
    await User.create({
      name: 'admin',
      password: 'admin',
      type: 'admin',
      fullName: 'Administrator',
    })
    
    const janko = await User.create({
      name: 'janko',
      password: 'janko',
      fullName: 'Janci Janco',
    })
    
    const alica = await User.create({
      name: 'alica',
      password: 'alica',
      fullName: 'Alica Alicaca',
    })
    
    const mg = await User.create({
      name: 'mg',
      password: 'mg',
      type: 'teacher',
      fullName: 'Marek Gitarista',
    })
    
    const malfred = await User.create({
      name: 'malfred',
      password: 'malfred',
      type: 'teacher',
      fullName: 'Malfred Pianista',
    })
    
    const pianoc = await malfred.related('teacherClasses').create({
      description: 'pianonono',
      instrument: 'piano',
      title: 'Piano class',
    })
    
    const guitarc = await malfred.related('teacherClasses').create({
      description: 'giratroor',
      instrument: 'guitar',
      title: 'Guitar class',
    })
    
    // create record of janko in piano class
    const jankoInPianoC = await ClassStudent.create({
      classId: pianoc.id,
      studentId: janko.id,
    })
    
    jankoInPianoC.related('lessons').create({
      start: DateTime.now().plus(Duration.fromDurationLike({days: 10, hours: 0})),
      end: DateTime.now().plus(Duration.fromDurationLike({days: 10, hours: 2})),
      notes: 'Your first lesson',
    })
    
    jankoInPianoC.related('lessons').create({
      start: DateTime.now().plus(Duration.fromDurationLike({days: 11, hours: 3})),
      end: DateTime.now().plus(Duration.fromDurationLike({days: 11, hours: 4})),
      notes: 'Janko learn more',
    })
    
    jankoInPianoC.related('lessons').create({
      start: DateTime.now().plus(Duration.fromDurationLike({days: 12})),
      end: DateTime.now().plus(Duration.fromDurationLike({days: 12, hours: 2})),
      notes: 'Practice',
    })
    
    const alicaInPianoC = await ClassStudent.create({
      classId: pianoc.id,
      studentId: alica.id,
    })
    
    const jankoInGuitarC = await ClassStudent.create({
      classId: guitarc.id,
      studentId: janko.id,
    })
    
    // alica is not in guitar class, she requests it
    const alicaRequest = await ClassRequest.create({
      date: DateTime.now(),
      classId: guitarc.id,
      message: 'yoo',
      studentId: alica.id,
    })
    
  }
}
