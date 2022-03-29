import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'
import ClassStudent from 'App/Models/ClassStudent'
import User from 'App/Models/User'

export default class DbSeedSeeder extends BaseSeeder {
  public async run () {
    // admin
    await User.create({
      name: 'admin',
      password: 'admin',
      type: 'admin',
    })
    
    const janko = await User.create({
      name: 'janko',
      password: 'janko',
    })
    
    const alica = await User.create({
      name: 'alica',
      password: 'alica',
    })
    
    const mg = await User.create({
      name: 'mg',
      password: 'mg',
      type: 'teacher',
    })
    
    const ikotul = await User.create({
      name: 'ikotul',
      password: 'ikotul',
      type: 'teacher',
    })
    
    const pianoc = await ikotul.related('classes').create({
      description: 'pianonono',
      instrument: 'piano',
      title: 'Piano class',
    })
    
    const guitarc = await ikotul.related('classes').create({
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
    
  }
}
