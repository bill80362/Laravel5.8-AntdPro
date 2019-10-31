<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Hash;
use App\Userlevel;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
//        $credentials = request(['email', 'password']);
        //'Content-Type': 'application/x-www-form-urlencoded',
//        $requestData = $request->json()->all();
//        $credentials['email'] = $requestData['userName'];
//        $credentials['password'] = $requestData['password'];

        $credentials['email'] = $request->userName;
        $credentials['password'] = $request->password;

//        return response()->json($requestData['userName']);

        if (! $token = auth('api')->attempt($credentials)) {
            $res['error'] = "Unauthorized";
            $res['status'] = "error";
            $res['currentAuthority'] = "guest";
            $res['type'] = '';
            return response()->json($res, 200);
        }

        $res['access_token'] = $token;
        $res['status'] = 'ok';
        $res['currentAuthority'] = 'admin';

        return response()->json($res);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentUser()
    {
        $user = auth()->user();
        $data['name'] = $user->name;
        $data['avatar'] = "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
        $data['userid'] = $user->id;
        $data['email'] = $user->email;
        $data['signature'] = $user->name;
        $data['title'] = $user->name;
        $data['group'] = $user->name;
        $data['unreadCount'] = $user->name;
        $data['country'] = $user->name;
        $data['country'] = $user->name;
        $data['address'] = $user->name;
        $data['phone'] = $user->phone;



        return response()->json($data);
    }

    /**
     *
     */
    public function create(Request $request){
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
        $user->parent_user_id = auth()->id();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->Alias = $request->Alias;
        $user->save();

        //建立關聯上層父id
//        $ulevel = new Userlevel();
//        $ulevel->setParentID($user->id,auth()->id());
//        dd(request(['test']));

        return response()->json(auth()->user());
    }


    /**
    *
     */
    public function update(Request $request){
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

        //更新使用者資料
        $user =User::find(auth()->id());
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->Alias = $request->Alias;
        $user->save();


        return response()->json([
            'result' => 'success',
            'data' => $user
        ]);

    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
