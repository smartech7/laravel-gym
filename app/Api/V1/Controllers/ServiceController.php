<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Resources\ServiceResource;
use App\Api\V1\Requests\CommonRequest as Request;
use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;

class ServiceController extends Controller
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * @param Service $model
     */
    public function __construct(Service $model)
    {
        $this->model = $model;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('create', Service::class);

        $builder = $this->model->orderBy('name', 'ASC');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';
            $builder = $builder->where('name', 'like', $keyword);
        }

        if (request()->has('filter_archived')) {
            $builder = $builder->where('is_archived', false);
        }

        $limit = request()->get('per_page', $this->per_page);

        $collection = ServiceResource::collection(
            $builder->paginate($limit)
        );

        if (request()->has('q') && request()->get('q')) {
            $collection->additional(['meta' => [
                'q' => request()->get('q'),
            ]]);
        }

        return $collection;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Service::class);

        $model = $this->model->create([
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new ServiceResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('view', $model);

        return new ServiceResource($model);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('update', $model);

        $model->update([
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new ServiceResource($model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->model->findOrFail($id);

        if ($model->is_default) {
            throw new DefaultEntityException('You cannot delete a default entity.');
        }

        if ($model->subscriptions()->count() > 0) {
            throw new SubscriptionException('You cannot delete an entity that has existing subscriptions.');
        }

        $this->authorize('delete', $model);

        $model->delete();

        return new ServiceResource($model);
    }
}
