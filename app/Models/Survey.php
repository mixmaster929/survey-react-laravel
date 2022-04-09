<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'location_id',
        'category_id',
        'product_id',
    ];

    public function categories()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }

    public function locations()
    {
        return $this->belongsTo(Locations::class, 'location_id');
    }

    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
