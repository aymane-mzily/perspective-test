<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use App\Models\AnswerRate;
use App\Models\User;

class ApiController extends Controller
{

    public function questions()
    {
        return Question::select('id', 'title')->orderBy('id', 'ASC')->get();
    }

    public function sendAnswers(Request $request)
    {
        $email = $request->post('email');//email is not used
        $answers = $request->post('answers');// data from the test 

        $rate_IE = 0;
        $rate_SN = 0;
        $rate_TF = 0;
        $rate_JP = 0;

        $answer_rates = [];

        $user = User::firstOrCreate([
            'email' => $email
        ]);

        $answer = new Answer;
        $answer->user_id = $user->id;

        foreach($answers as $question_id=>$answer_rate){
            $question = Question::find($question_id);
            if($question){

                $answerRate = new AnswerRate;
                $answerRate->question_id = $question->id;
                $answerRate->rate = $answer_rate;
                $answer_rates[] = $answerRate;

                $rate = $answer_rate-1;
                if($question->prespective == Question::IE){
                    if($question->operation == Question::OPERATOR_PLUS)
                        $rate_IE += $rate;
                    else if($question->operation == Question::OPERATOR_MINUS)
                        $rate_IE -= $rate;
                }else if($question->prespective == Question::SN){
                    if($question->operation == Question::OPERATOR_PLUS)
                        $rate_SN += $rate;
                    else if($question->operation == Question::OPERATOR_MINUS)
                        $rate_SN -= $rate;
                }else if($question->prespective == Question::TF){
                    if($question->operation == Question::OPERATOR_PLUS)
                        $rate_TF += $rate;
                    else if($question->operation == Question::OPERATOR_MINUS)
                        $rate_TF -= $rate;
                }else if($question->prespective == Question::JP){
                    if($question->operation == Question::OPERATOR_PLUS)
                        $rate_JP += $rate;
                    else if($question->operation == Question::OPERATOR_MINUS)
                        $rate_JP -= $rate;
                }
            }
        }


        $rate_IE = ($rate_IE >= 0)? 0 : 1;
        $rate_SN = ($rate_SN >= 0)? 0 : 1;
        $rate_TF = ($rate_TF >= 0)? 0 : 1;
        $rate_JP = ($rate_JP >= 0)? 0 : 1;
        $perspective = (!$rate_IE?"I":"E").(!$rate_SN?"S":"N").(!$rate_TF?"T":"F").(!$rate_JP?"J":"P");

        //Create Answer
        $answer->perspective = $perspective;
        $answer->save();

        $answer->rates()->saveMany($answer_rates);

        return [
            'perspective' => $perspective,
            'leanings' => [
                [
                    'leftLeaning' => 'Introversion(I)',
                    'rightLeaning' => 'Extraversion(E)',
                    'status' => $rate_IE,
                ],
                [
                    'leftLeaning' => 'Sensings(S)',
                    'rightLeaning' => 'Intuition(N)',
                    'status' => $rate_SN,
                ],
                [
                    'leftLeaning' => 'Thinking(T)',
                    'rightLeaning' => 'Feeling(F)',
                    'status' => $rate_TF,
                ],
                [
                    'leftLeaning' => 'Judging(J)',
                    'rightLeaning' => 'Perceiving(P)',
                    'status' => $rate_JP,
                ],
            ],
        ];
    }
}
