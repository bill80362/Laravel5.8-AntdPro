<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigInteger('Cid')->nullable();;//股東(站長id)
            $table->bigInteger('parent_user_id')->nullable();;//上層id
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->timestamp('email_verified_at')->nullable();

            $table->string('Alias',20)->unique()->nullable();
            $table->double('Credit',14,4)->default(0);

            $table->enum('isEnable',array('Y','N'))->default('Y');

            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->index(['id', 'parent_user_id']);
        });

//        Schema::create('users_level', function (Blueprint $table) {
//            $table->bigInteger('parent_user_id');
//            $table->bigInteger('user_id');
//
//            $table->primary(['parent_user_id', 'user_id'], '123123');
//
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('users_level');
    }
}
