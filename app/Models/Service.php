<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Service
 * 
 * @property int $id
 * @property string $name
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class Service extends Model
{
	use HasSubscriptions;

	protected $fillable = [
		'name',
		'status',
		'description',
	];
}
