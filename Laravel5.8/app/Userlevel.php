<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Userlevel extends Model
{
    public function setParentID($_parent_user_id,$_id)
    {
        DB::table('users_level')->insert(
            ['parent_user_id' => $_parent_user_id, 'user_id' => $_id]
        );
    }
}
