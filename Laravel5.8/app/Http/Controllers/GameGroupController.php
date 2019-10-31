<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GameGroup;
use App\User;
use Illuminate\Support\Facades\Validator;


class GameGroupController extends Controller
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
        $GameGroups = GameGroup::where('CID', $user->id );

        if($request->GameProvider!="")
            $GameGroups->where('GameProvider', $request->GameProvider);
        if($request->GameTagID!="")
            $GameGroups->where('GameTagID', $request->GameTagID);
        if($request->Status!="")
            $GameGroups->where('Status', $request->Status);

        $GameGroupsData = $GameGroups->get();
        $result['list'] = $GameGroupsData;
        $pagination['current'] = 1;
        $pagination['pageSize'] = 10;
        $pagination['total'] = count($GameGroupsData);
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
        //
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
            'GameProvider'=>$request->GameProvider,
            'GameTagID'=>$request->GameTagID,
            'Title'=>$request->Title,
            'Content'=>$request->Content,
            'Seq'=>$request->Seq,
            'PS'=>$request->PS,
            'Status'=>$request->Status,
        ], [
            'GameProvider' => 'required|max:10',
            'GameTagID' => 'required|integer',
            'Title' => 'max:100',
            'Content' => 'max:200',
            'Seq' => 'integer',
            'Status' => 'required|max:1',
        ]);
        if ($validator->fails()) {
            $rs['result'] = 'error';
            $rs['data'] = $validator->errors();
            return response()->json($rs);
        }
        //建立
        $GameGroup = new GameGroup();
        $GameGroup->CID = auth()->id();
        $GameGroup->GameProvider = $request->GameProvider;
        $GameGroup->GameTagID = $request->GameTagID;
        $GameGroup->Title = $request->Title;
        $GameGroup->Content = $request->Content;
        $GameGroup->Seq = $request->Seq;
        $GameGroup->PS = $request->PS;
        $GameGroup->Status = $request->Status;
        $GameGroup->save();

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
            'GameProvider'=>$request->GameProvider,
            'GameTagID'=>$request->GameTagID,
            'Title'=>$request->Title,
            'Content'=>$request->Content,
            'Seq'=>$request->Seq,
            'Status'=>$request->Status,
        ], [
            'GameProvider' => 'required|max:10',
            'GameTagID' => 'required|integer',
            'Title' => 'max:100',
            'Content' => 'max:200',
            'Seq' => 'required|integer',
            'Status' => 'required|max:1',
        ]);
        if ($validator->fails()) {
            $rs['result'] = 'error';
            $rs['data'] = $validator->errors();
            return response()->json($rs);
        }
        //更新
        $GameGroup = GameGroup::where('GameProvider',$request->GameProvider)
            ->where('GameTagID',$request->GameTagID)
            ->where('CID',auth()->id())
            ->get()
            ->first();
//        $GameGroup = GameGroup::find(array('GameProvider'=>$request->GameProvider,'GameTagID'=>$request->GameTagID));
//        dd($GameGroup);
        $GameGroup->Title = $request->Title;
        $GameGroup->Content = $request->Content;
        $GameGroup->Seq = $request->Seq;
        $GameGroup->PS = $request->PS;
        $GameGroup->Status = $request->Status;
        $GameGroup->save();

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
