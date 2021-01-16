<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $data = array(
            array('title'=>'You find it takes effort to introduce yourself to other people.', 'prespective'=>Question::IE, 'operation'=>Question::OPERATOR_PLUS),
            array('title'=>'You consider yourself more practical than creative.', 'prespective'=>Question::SN, 'operation'=>Question::OPERATOR_PLUS),
            array('title'=>'Winning a debate matters less to you than making sure no one gets upset.', 'prespective'=>Question::TF, 'operation'=>Question::OPERATOR_MINUS),
            array('title'=>'You get energized going to social events that involve many interactions.', 'prespective'=>Question::IE, 'operation'=>Question::OPERATOR_MINUS),
            array('title'=>'You often spend time exploring unrealistic and impractical yet intriguing ideas.', 'prespective'=>Question::SN, 'operation'=>Question::OPERATOR_MINUS),
            array('title'=>'Deadlines seem to you to be of relative rather than absolute importance.', 'prespective'=>Question::JP, 'operation'=>Question::OPERATOR_MINUS),
            array('title'=>'Logic is usually more important than heart when it comes to making important decisions.', 'prespective'=>Question::TF, 'operation'=>Question::OPERATOR_PLUS),
            array('title'=>'Your home and work environments are quite tidy.', 'prespective'=>Question::JP, 'operation'=>Question::OPERATOR_PLUS),
            array('title'=>'You do not mind being at the center of attention.', 'prespective'=>Question::IE, 'operation'=>Question::OPERATOR_MINUS),
            array('title'=>'Keeping your options open is more important than having a to-do list.', 'prespective'=>Question::JP, 'operation'=>Question::OPERATOR_MINUS),
        );
        
        Question::insert($data);
    }
}
