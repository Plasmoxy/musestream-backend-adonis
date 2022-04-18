import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'
import ClassRequest from 'App/Models/ClassRequest'
import ClassStudent from 'App/Models/ClassStudent'
import Lesson from 'App/Models/Lesson'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

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
