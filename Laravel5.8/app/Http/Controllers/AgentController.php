<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use Hash;

class AgentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        //拉出下線的帳號
        $user = auth()->user();
        $users = User::where('parent_user_id', $user->id );

        if($request->name!="")
            $users->where('name', 'like', '%' . $request->name . '%');
        if($request->isEnable=="N" || $request->isEnable=="Y" )
            $users->where('isEnable',$request->isEnable);

        $users = $users->get();
        $result['list'] = $users;
        $pagination['current'] = 1;
        $pagination['pageSize'] = 10;
        $pagination['total'] = count($users);
        $result['pagination'] = $pagination;

        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //驗證資料
        $validator = Validator::make([
            'name'=>$request->name,
            'password'=>$request->password,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'Alias'=>$request->Alias,
        ], [
            'name' => 'required|max:255',
            'password' => 'required',
            'email' => 'required|max:255',
            'phone' => 'required|max:15',
            'Alias' => 'required|max:20',
        ]);
        if ($validator->fails()) {
            $rs['result'] = 'error';
            $rs['data'] = $validator->errors();
            return response()->json($rs);
        }
        //建立使用者
        $user = new User();
        $user->Cid = auth()->id();
        $user->parent_user_id = auth()->id();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->Alias = $request->Alias;
        $user->save();
        //導去index
        return $this->index(new Request());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //驗證資料
        $validator = Validator::make([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'Alias'=>$request->Alias,
        ], [
            'name' => 'required|max:255',
            'email' => 'required|max:255',
            'phone' => 'required|max:15',
            'Alias' => 'required|max:20',
        ]);
        if ($validator->fails()) {
            $rs['result'] = 'error';
            $rs['data'] = $validator->errors();
            return response()->json($rs);
        }
        //儲存資料
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->Alias = $request->Alias;
        $user->isEnable = $request->isEnable;
        $user->save();
        //導去index
        return $this->index(new Request());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
