<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            //primary key
            $table->string('GameProvider', 10);
            $table->tinyInteger('GameID');
            $table->primary(['GameProvider', 'GameID']);
            //內容
            $table->integer('CID');//公司ID
            $table->tinyInteger('GameTagID');
            $table->string('GameNameCN', 100);//標題
            $table->string('PS', 200)->nullable();//備註
            $table->char('Status', 1)->default('N');//Y or N
            //附註
            $table->timestamps();//加入 created_at 和 updated_at 欄位
            //index key
            $table->index('CID');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
