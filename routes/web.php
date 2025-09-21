<?php

use App\Http\Controllers\AddProductController;
use App\Http\Controllers\BookHotelController;
use App\Http\Controllers\bookingReportController;
use App\Http\Controllers\CashController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DasboardController;
use App\Http\Controllers\DueController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenceController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\HotelPaymentController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PurchaseItemReportController;
use App\Http\Controllers\ReturnProductController;
use App\Http\Controllers\ReturnSaleController;
use App\Http\Controllers\SaleItemsReportController;
use App\Http\Controllers\SalePaymentController;
use App\Http\Controllers\SaleProductController;
use App\Http\Controllers\SendKitchenController;
use App\Http\Controllers\ServiceItemController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\TypeExpenceController;
use App\Http\Controllers\VendorController;
use App\Models\Customer;
use App\Models\Product;
use App\Models\SendKitchen;
use App\Models\Stock;
use App\Models\Supplier;
use Faker\Provider\ar_EG\Internet;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/ozair', function () {
    return Inertia::render('Ozair', ['ozair' => 'ozair']);
});

Route::get('/dashboard', [DasboardController::class, 'index'])->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

//***********************************************************************

Route::get('/supplier/create', [SuppliersController::class, 'create'])->name('supplier.create');
Route::post('/supplier', [SuppliersController::class, 'store'])->name('supplier.store');

Route::get('/Addproducts', [AddProductController::class, 'create'])->name('addProduct.create');
Route::post('/Addproducts', [AddProductController::class, 'store'])->name('addProduct.store');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::get('/products/report', [ProductController::class, 'report'])->name('products.report');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');

Route::get('/payment/{id}', [PaymentController::class, 'create'])->name('payment.create');
Route::post('/payment', [PaymentController::class, 'store'])->name('payment.store');

Route::get("/stock", [StockController::class, 'index'])->name('stock.index');
Route::get("/stockZero", [StockController::class, 'show'])->name('stock.show');

Route::get("/returnProduct", [ReturnProductController::class, 'create'])->name('return.create');
Route::post("/returnProduct", [ReturnProductController::class, 'update'])->name('return.update');

Route::get("/purchaseItemReport", [PurchaseItemReportController::class, 'report'])->name('purchaseItemReport.report');

//******************************************************************************************/

Route::get('/customer/create', [CustomerController::class, 'create'])->name('customer.create');
Route::post('/addCutomer', [CustomerController::class, 'store'])->name('customer.store');

Route::get('/saleProducts/create', [SaleProductController::class, 'create'])->name('saleProduct.create');
Route::post('/saleProducts', [SaleProductController::class, 'show'])->name('saleProduct.show');
Route::get('/saleProducts/report', [SaleProductController::class, 'report'])->name('saleProduct.report');

Route::get('salePayment/{id}', [SalePaymentController::class, 'create'])->name('salePayment.create');
Route::post('salePayment', [SalePaymentController::class, 'store'])->name('salePayment.store');

Route::get("/returnSale", [ReturnSaleController::class, 'create'])->name('returnSale.create');
Route::post("/returnSale", [ReturnSaleController::class, 'update'])->name('returnSale.update');
Route::get("/returnSale/index", [ReturnSaleController::class, 'index'])->name('returnSale.index');

Route::get('/saleItemsReport', [SaleItemsReportController::class, 'report'])->name('saleItemReport.report');

Route::get('/form', function () {    
    $products = Product::all();
    $supplier = Supplier::all();    
    return Inertia::render('SaleProducts/Formtable', 
        ['suppliers'=>$supplier, 'products'=>$products]); 
});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

//******************************************************************************************/

Route::get('/addMenu', [MenuController::class, 'create'])->name('menu.create');
Route::post('/addMenu', [MenuController::class, 'store'])->name('menu.store');
Route::get('/menuList', [MenuController::class, 'list'])->name('menu.list');
Route::get('/menuList/{id}', [MenuController::class, 'show'])->name('menu.show');
Route::get('/menuEdit/{id}', [MenuController::class, 'edit'])->name('menu.edit');
Route::put('/menuEdit/{id}', [MenuController::class, 'update'])->name('menu.update');
// Route::delete('/menuList/{id}', [MenuController::class, 'delete'])->name('menu.delete');

Route::get('/addServiceItem', [ServiceItemController::class, 'create'])->name('addService.create');
Route::post('/addServiceItem', [ServiceItemController::class, 'store'])->name('addService.store');

Route::get('/book', [BookHotelController::class, 'create'])->name('book.create');
Route::post('/book', [BookHotelController::class, 'store'])->name('book.store');

Route::get('/booingReport', [bookingReportController::class, 'create'])->name('bookingReport.create');
Route::post('/booingReport', [bookingReportController::class, 'index'])->name('bookingReport.index');

Route::get('/bookingCollection', [bookingReportController::class, 'report'])->name('bookingCollection.report');

Route::get('/hotelPayment', [HotelPaymentController::class, 'create'])->name('hotelPayment.create');
Route::post('/hotelPayment', [HotelPaymentController::class, 'store'])->name('hotelPayment.store');

Route::get('/hall', [HallController::class, 'create'])->name('hall.create');
Route::post('/hall', [HallController::class, 'store'])->name('hall.store');

Route::get('/employee', [EmployeeController::class, 'create'])->name('employee.create');
Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');

Route::get('/vendor', [VendorController::class, 'create'])->name('vendor.create');
Route::post('/vendor', [VendorController::class, 'store'])->name('vendor.store');

Route::get('/expense', [ExpenceController::class, 'create'])->name('expense.create');
Route::post('/expense', [ExpenceController::class, 'store'])->name('expense.store');
Route::get('/expenseًReport', [ExpenceController::class, 'report'])->name('expense.report');
Route::post('/expenseًReport', [ExpenceController::class, 'index'])->name('expense.index');

Route::get('/cash', [CashController::class, 'report'])->name('cash.report');
Route::post('/cash', [CashController::class, 'index'])->name('cash.index');

Route::post('/typeExpense', [TypeExpenceController::class, 'store'])->name('typeExpense.store');

Route::get('/sendKitchen', [SendKitchenController::class, 'create'])->name('sendKitchen.create');
Route::post('/sendKitchen', [SendKitchenController::class, 'store'])->name('sendKitchen.store');
Route::get('/sendKitchenReport', [SendKitchenController::class, 'report'])->name('sendKitchen.report');

Route::get('/saleDue', [DueController::class, 'sale'])->name('Due.sale');
Route::get('/purchaseDue', [DueController::class, 'purchase'])->name('Due.purchase');
Route::get('/bookingDue', [DueController::class, 'booking'])->name('Due.booking');
