<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/add_questions', [App\Http\Controllers\ApiController::class, 'addQuestions']);
Route::get('/questions', [App\Http\Controllers\ApiController::class, 'questions']);
Route::post('/send_answers', [App\Http\Controllers\ApiController::class, 'sendAnswers']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
