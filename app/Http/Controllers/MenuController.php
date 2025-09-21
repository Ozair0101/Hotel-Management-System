<?php

namespace App\Http\Controllers;

use App\Models\MenuBooking;
use App\Models\MenuService;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function create() {
        $services = ServiceItem::all();
        return Inertia::render('Menu/AddMenu', ['services'=> $services]);
    }
    public function store(Request $request) {
        
        $request->validate([
            'price' => 'required|min:0|numeric',
            'menu' => 'required|unique:'.MenuService::class,
            'selectedItems.*.id' => [
                'required', 'integer', Rule::exists('service_items', 'id'),
            ] 
        ]);
    //    dd($request->all());
        $selectedItems = $request->selectedItems; 
        $service_item_id = array_map(fn($item)=> $item['id'], $selectedItems);
        // dd($service_item_id);
        $menu = MenuService::create([
            'price' => $request->price,
            'menu' => $request->menu,
        ]);
        $service_item_id = collect($selectedItems)->pluck('id');
        // dd($service_item_id);
        $menu->serviceItems()->sync($service_item_id);
        return redirect()->back()->with('success', 'successfully');
    }

    public function list() {
        $list = MenuService::with(['serviceItems'])->get();
        $list = $list->map(function ($menu){
            return [
                'id' => $menu->id,
                'price' => $menu->price,
                'menu' =>$menu->menu,
                'service_items' => $menu->serviceItems->map(function ($item) {
                    return [
                        'id' => $item->id, 
                        'name' => $item->name,
                    ];
                })
            ];
        });
        // dd($list[0]['service_items']);
        return Inertia::render('Menu/List', ['list'=> $list]);
    }
    public function show($id) {
        $list = MenuService::findOrFail($id);
        $list = [
                'id' => $list->id,
                'price' => $list->price,
                'menu' =>$list->menu,
                'service_items' => $list->serviceItems->map(function ($item) {
                    return [
                        'id' => $item->id, 
                        'name' => $item->name,
                    ];
                })
            ];
        // dd($list['service_items']);
        return Inertia::render('Menu/Show', ['list'=> $list]);
    }

    public function edit($id) {
        $services = ServiceItem::all(); 
        $menu = MenuService::findOrFail($id); 
        $menuItems = $menu->serviceItems->pluck('id')->toArray();
        $menu = [
            'id' => $menu->id,
            'price' => $menu->price,
            'menu' =>$menu->menu,
            'service_items' => $menu->serviceItems->map(function ($item) {
                return [
                    'id' => $item->id, 
                    'name' => $item->name,
                ];
            })
        ];
        // dd($menu); 
        return Inertia::render("Menu/Edit",  ['services'=>$services, 'menu'=> $menu, 'menuItems'=>$menuItems]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'price' => 'required|min:0|numeric',
            'menu' => 'required',
            'selectedItems.*.id' => [
                 'integer', Rule::exists('service_items', 'id'),
            ] 
        ]);
        $selectedItems = $request->selectedItems;
        
        $menu = MenuService::findOrFail($id); 
        $menu->update([
            'price' => $request->price,
            'menu' => $request->menu,
        ]);
        // $service_item_id = collect($selectedItems)->pluck('id');
        $menu->serviceItems()->sync($selectedItems);

        return redirect()->route('menu.show', $id);
    }

    // public function delete($id) {
    //     $menu = MenuService::findOrFail($id);
    //     $menu->delete(); 
    //     // dd("sfasf"); 
    //     return redirect()->back()->with('success');
    // }
}
